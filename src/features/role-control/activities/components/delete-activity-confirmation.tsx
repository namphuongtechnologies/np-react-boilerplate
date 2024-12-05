import { DeleteOutlined } from '@ant-design/icons';
import { App, Button, Popconfirm, Tooltip } from 'antd';

import { ServiceMessage } from '~/utils/serviceMessage';
import { useDeleteActivity } from '../hooks/activities/mutations/use-delete-activity';
import type { Activity } from '../types/Activity';

const DeleteActivityConfirmation = (props: { activity?: Activity }) => {
  const { activity } = props;

  const { message } = App.useApp();
  const { mutate: deleteActivity, invalidate } = useDeleteActivity();

  const onConfirm = (id?: string) => {
    if (!id) return;
    deleteActivity(id, {
      onSuccess: (response) => {
        invalidate();
        message.success(ServiceMessage.success(response).message);
      },
      onError: (error) => {
        message.error(ServiceMessage.error(error).message);
      },
    });
  };
  return (
    <Popconfirm
      title='Xóa quyền'
      description='Bạn chắc chắn muốn xóa quyền này?'
      onConfirm={() => onConfirm(activity?.Id)}
    >
      <Tooltip title='Xóa quyền'>
        <Button
          danger
          size='small'
          type='text'
          icon={<DeleteOutlined style={{ fontSize: 18 }} />}
        />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteActivityConfirmation;

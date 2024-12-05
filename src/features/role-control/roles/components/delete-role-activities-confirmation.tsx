import { useParams } from 'react-router-dom';
import { App, Button, Popconfirm, Tooltip } from 'antd';

import { ServiceMessage } from '~/utils/serviceMessage';
import { useDeleteRoleActivities } from '~/features/role-control/roles/hooks/mutations/use-delete-role-activities';

interface Props {
  roleActivitiyKeys?: string[];
  resetSelectedRowKeys?: () => void;
}

const DeleteRoleActivitiesConfirmation = (props: Props) => {
  const { roleActivitiyKeys, resetSelectedRowKeys = () => {} } = props;

  const { message } = App.useApp();
  const params = useParams<{ id: string }>();
  const { mutate: deleteRoleActivities, invalidate } = useDeleteRoleActivities();

  const onConfirm = (roleActivitiyKeys: string[]) => {
    deleteRoleActivities(roleActivitiyKeys, {
      onSuccess: (response) => {
        invalidate(params.id);
        resetSelectedRowKeys();
        message.success(ServiceMessage.success(response).message);
      },
      onError: (error) => {
        message.error(ServiceMessage.error(error).message);
      },
    });
  };

  if (!roleActivitiyKeys || roleActivitiyKeys.length === 0) return null;

  return (
    <Popconfirm
      title='Xóa quyền'
      description='Bạn chắc chắn muốn xóa quyền trong nhóm này?'
      onConfirm={() => onConfirm(roleActivitiyKeys)}
    >
      <Tooltip title='Xóa quyền'>
        <Button type='text' size='large'>
          <span className='text-red-500'>Xóa {roleActivitiyKeys.length} được chọn</span>
        </Button>
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteRoleActivitiesConfirmation;

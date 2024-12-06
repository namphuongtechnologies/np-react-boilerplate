import type { Key } from 'react';
import { App, Button, Popconfirm, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';

import { ServiceMessage } from '~/utils/serviceMessage';
import { useDeleteUserActivities } from '~/features/role-control/users/hooks/mutations/use-delete-user-activities';

interface Props {
  userActivityIds?: string[] | Key[];
  resetSelectedRowKeys?: () => void;
}

const DeleteUserActivitiesConfirmation = (props: Props) => {
  const { userActivityIds, resetSelectedRowKeys = () => {} } = props;

  const params = useParams<{ id: string }>();
  const { message } = App.useApp();
  const { mutate: deleteUserActivities, invalidate } = useDeleteUserActivities();

  const onConfirm = (userActivityIds: string[]) => {
    if (!params.id || userActivityIds.length === 0) return;
    deleteUserActivities(userActivityIds, {
      onSuccess(response) {
        invalidate(params.id);
        message.success(ServiceMessage.success(response).message);
        resetSelectedRowKeys();
      },
      onError(error) {
        message.error(ServiceMessage.error(error).message);
      },
    });
  };

  if (!userActivityIds || userActivityIds.length === 0) return null;

  return (
    <Popconfirm
      title='Xóa quyền'
      description='Bạn chắc chắn muốn xóa quyền này?'
      onConfirm={() => onConfirm(userActivityIds as string[])}
      okText='Xác nhận'
      cancelText='Hủy bỏ'
    >
      <Tooltip title='Xóa quyền'>
        <Button type='text'>
          <span className='text-red-500'>Xóa {userActivityIds.length} được chọn</span>
        </Button>
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteUserActivitiesConfirmation;

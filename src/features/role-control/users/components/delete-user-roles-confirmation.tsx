import { App, Button, Popconfirm, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';

import { ServiceMessage } from '~/utils/serviceMessage';
import { useDeleteUserRoles } from '~/features/role-control/users/hooks/mutations/use-delete-user-roles';

interface Props {
  userRoleIds?: string[];
  resetSelectedRowKeys?: () => void;
}

const DeleteUserRolesConfirmation = (props: Props) => {
  const { userRoleIds, resetSelectedRowKeys = () => {} } = props;

  const { message } = App.useApp();
  const { mutate: deleteUserRoles, invalidate } = useDeleteUserRoles();
  const params = useParams<{ id: string }>();

  const onConfirm = (userRoleIds: string[]) => {
    if (userRoleIds.length === 0) return;
    deleteUserRoles(userRoleIds, {
      onSuccess(response) {
        message.success(ServiceMessage.success(response).message);
        invalidate(params.id);
        resetSelectedRowKeys();
      },
      onError(error) {
        message.error(ServiceMessage.error(error).message);
      },
    });
  };

  if (!userRoleIds || userRoleIds.length === 0) return null;

  return (
    <Popconfirm
      title='Xóa nhóm quyền'
      description='Bạn chắc chắn muốn xóa nhóm quyền này?'
      onConfirm={() => onConfirm(userRoleIds)}
    >
      <Tooltip title='Xóa nhóm quyền'>
        <Button type='text'>
          <span className='text-red-500'>Xóa {userRoleIds.length} được chọn</span>
        </Button>
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteUserRolesConfirmation;

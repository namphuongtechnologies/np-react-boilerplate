import { DeleteOutlined } from '@ant-design/icons';
import { App, Button, Popconfirm, Tooltip } from 'antd';

import { ServiceMessage } from '~/utils/serviceMessage';
import { useDeleteRole } from '~/features/role-control/roles/hooks/mutations/use-delete-role';
import type { Role } from '~/features/role-control/roles/types/Role';

const DeleteRoleConfirmation = (props: { role?: Role }) => {
  const { role } = props;

  const { message } = App.useApp();
  const { mutate: deleteRole, invalidate } = useDeleteRole();

  const onConfirm = (id?: string) => {
    if (!id) return;
    deleteRole(id, {
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
      title='Xóa nhóm quyền'
      description='Bạn chắc chắn muốn xóa nhóm quyền này?'
      onConfirm={() => onConfirm(role?.Id)}
    >
      <Tooltip title='Xóa nhóm quyền'>
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

export default DeleteRoleConfirmation;

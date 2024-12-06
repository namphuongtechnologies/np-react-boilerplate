import { Space } from 'antd';
import type { User } from '~/features/role-control/users/types/User';
import DeleteUserConfirmation from '~/features/role-control/users/components/delete-user-confirmation';
import UpdateUserModal from '~/features/role-control/users/components/update-user-modal';

export const UserListOperators = ({ user }: { user?: User }) => {
  return (
    <Space size='middle' onClick={(e) => e.stopPropagation()}>
      <UpdateUserModal user={user} />
      <DeleteUserConfirmation userId={user?.Id} />
    </Space>
  );
};

export default UserListOperators;

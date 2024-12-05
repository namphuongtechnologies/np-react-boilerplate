import { Space } from 'antd';

import type { Role } from '~/features/role-control/roles/types/Role';

import UpdateRoleModal from '~/features/role-control/roles/components/update-role-modal';
import DeleteRoleConfirmation from '~/features/role-control/roles/components/delete-role-confirmation';

const RoleListOperators = ({ role }: { role?: Role }) => {
  return (
    <Space size='small' onClick={(e) => e.stopPropagation()}>
      <UpdateRoleModal role={role} />
      <DeleteRoleConfirmation role={role} />
    </Space>
  );
};

export default RoleListOperators;

import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import type { Role } from '~/features/role-control/roles/types/Role';

import Modal from '~/components/modals/modal';
import CreateRoleForm from '~/features/role-control/roles/components/create-role-form';

const UpdateRoleModal = ({ role }: { role?: Role }) => {
  return (
    <Modal>
      <Modal.Opens opens={`edit-role-modal-${role?.Id}`}>
        <Tooltip destroyTooltipOnHide title='Chỉnh sửa nhóm quyền'>
          <Button
            size='small'
            type='text'
            icon={<EditOutlined style={{ color: '#eab308', fontSize: 18 }} />}
          />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window
        name={`edit-role-modal-${role?.Id}`}
        modalProps={{ title: 'Chỉnh sửa nhóm quyền' }}
      >
        <CreateRoleForm role={role} />
      </Modal.Window>
    </Modal>
  );
};

export default UpdateRoleModal;

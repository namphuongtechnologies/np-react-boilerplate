import { EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import type { User } from '~/features/role-control/users/types/User';

import AddUserForm from '~/features/role-control/users/components/add-user-form';
import Modal from '~/components/modals/modal';

const UpdateUserModal = ({ user }: { user?: User }) => {
  const MODAL_NAME = `update-user-modal-${user?.Id}`;

  return (
    <Modal>
      <Modal.Opens opens={MODAL_NAME}>
        <Tooltip title='Cập nhật người dùng'>
          <Button
            size='small'
            type='text'
            icon={<EditOutlined style={{ color: '#eab308', fontSize: 18 }} />}
          />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window modalProps={{ title: 'Cập nhật người dùng', width: '900px' }} name={MODAL_NAME}>
        <AddUserForm user={user} />
      </Modal.Window>
    </Modal>
  );
};

export default UpdateUserModal;

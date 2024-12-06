import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import Modal from '~/components/modals/modal';
import AddUserForm from '~/features/role-control/users/components/add-user-form';

const AddUserModal = () => {
  return (
    <Modal>
      <Modal.Opens opens='add-user-modal'>
        <Tooltip title='Thêm người dùng'>
          <Button type='primary' icon={<PlusOutlined />} size='large' />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window
        modalProps={{
          title: 'Thêm người dùng',
          width: '900px',
        }}
        name='add-user-modal'
      >
        <AddUserForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddUserModal;

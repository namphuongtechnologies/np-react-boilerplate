import { Button } from 'antd';

import Modal from '~/components/modals/modal';
import AddUserRolesForm from '~/features/role-control/users/components/add-user-roles-form';

const AddUserRolesModal = () => {
  return (
    <Modal>
      <Modal.Opens opens='add-roles-modal'>
        <Button type='primary'>Bổ sung</Button>
      </Modal.Opens>
      <Modal.Window modalProps={{ title: 'Thêm nhóm quyền', width: '80vw' }} name='add-roles-modal'>
        <AddUserRolesForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddUserRolesModal;

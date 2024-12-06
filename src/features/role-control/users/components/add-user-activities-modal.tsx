import { Button } from 'antd';

import Modal from '~/components/modals/modal';
import AddUserActivitiesForm from '~/features/role-control/users/components/add-user-activities-form';

const AddUserActivitiesModal = () => {
  return (
    <Modal>
      <Modal.Opens opens='add-activities-modal'>
        <Button type='primary'>Bổ sung</Button>
      </Modal.Opens>
      <Modal.Window modalProps={{ title: 'Thêm quyền', width: '80vw' }} name='add-activities-modal'>
        <AddUserActivitiesForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddUserActivitiesModal;

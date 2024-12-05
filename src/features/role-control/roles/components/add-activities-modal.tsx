import { Button } from 'antd';

import Modal from '~/components/modals/modal';
import AddActivitiesForm from '~/features/role-control/roles/components/add-activities-form';

const AddActivitiesModal = () => {
  return (
    <Modal>
      <Modal.Opens opens='add-activities-modal'>
        <Button type='primary' size='large'>
          Bổ sung
        </Button>
      </Modal.Opens>
      <Modal.Window
        modalProps={{
          title: 'Bổ sung quyền',
          width: '80vw',
        }}
        name='add-activities-modal'
      >
        <AddActivitiesForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddActivitiesModal;

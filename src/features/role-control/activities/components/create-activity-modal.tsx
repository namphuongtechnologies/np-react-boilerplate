import { Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import CreateActivityForm from '~/features/role-control/activities/components/create-activity-form';
import Modal from '~/components/modals/modal';

const CreateActivityModal = () => {
  return (
    <Modal>
      <Modal.Opens opens='create-activity-modal'>
        <Tooltip destroyTooltipOnHide title='Tạo quyền'>
          <Button size='large' type='primary' icon={<PlusOutlined />} />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window name='create-activity-modal' modalProps={{ title: 'Tạo quyền' }}>
        <CreateActivityForm />
      </Modal.Window>
    </Modal>
  );
};

export default CreateActivityModal;

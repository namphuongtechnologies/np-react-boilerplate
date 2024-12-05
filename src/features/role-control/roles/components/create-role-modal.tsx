import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import CreateRoleForm from './create-role-form';
import Modal from '~/components/modals/modal';

const CreateRoleModal = () => {
  return (
    <Modal>
      <Modal.Opens opens='create-role-modal'>
        <Tooltip destroyTooltipOnHide title='Tạo nhóm quyền'>
          <Button size='large' type='primary' icon={<PlusOutlined />} />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window name='create-role-modal' modalProps={{ title: 'Tạo nhóm quyền' }}>
        <CreateRoleForm />
      </Modal.Window>
    </Modal>
  );
};

export default CreateRoleModal;

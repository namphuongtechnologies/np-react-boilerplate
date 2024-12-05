import { EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import type { Activity } from '../types/Activity';
import CreateActivityForm from './create-activity-form';
import Modal from '~/components/modals/modal';

interface Props {
  activity?: Activity;
}

const UpdateActivityModal = (props: Props) => {
  const { activity } = props;

  const modalName = `edit-activity-modal-${activity?.Id}`;
  return (
    <Modal>
      <Modal.Opens opens={modalName}>
        <Tooltip title='Chỉnh sửa quyền'>
          <Button
            size='small'
            type='text'
            icon={<EditOutlined style={{ color: '#eab308', fontSize: 18 }} />}
          />
        </Tooltip>
      </Modal.Opens>
      <Modal.Window name={modalName} modalProps={{ title: 'Chỉnh sửa quyền' }}>
        <CreateActivityForm activity={activity} />
      </Modal.Window>
    </Modal>
  );
};

export default UpdateActivityModal;

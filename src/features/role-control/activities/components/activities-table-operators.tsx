import { Space } from 'antd';

import type { Activity } from '../types/Activity';

import DeleteActivityConfirmation from './delete-activity-confirmation';
import UpdateActivityModal from './update-activity-modal';

const ActivitiesTableOperators = ({ activity }: { activity: Activity }) => {
  return (
    <Space>
      <UpdateActivityModal activity={activity} />
      <DeleteActivityConfirmation activity={activity} />
    </Space>
  );
};

export default ActivitiesTableOperators;

import { Space } from 'antd';

import type { Activity } from '~/features/role-control/activities/types/Activity';

import DeleteActivityConfirmation from '~/features/role-control/activities/components/delete-activity-confirmation';
import UpdateActivityModal from '~/features/role-control/activities/components/update-activity-modal';

const ActivitiesTableOperators = ({ activity }: { activity: Activity }) => {
  return (
    <Space>
      <UpdateActivityModal activity={activity} />
      <DeleteActivityConfirmation activity={activity} />
    </Space>
  );
};

export default ActivitiesTableOperators;

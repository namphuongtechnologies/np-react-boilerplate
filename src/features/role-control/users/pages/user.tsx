import { withDefault, StringParam, useQueryParams } from 'use-query-params';
import { Tabs, type TabsProps } from 'antd';

import { UserTabsEnum } from '~/features/role-control/users/types/UserTabsEnum';
import { searchParamKeys } from '~/constants/searchParamKeys';

import Container from '~/components/ui/container';
import UserRolesContent from '~/features/role-control/users/components/user-roles-content';
import UserActivitiesContent from '~/features/role-control/users/components/user-activities-content';

const User = () => {
  const [searchParams, setSearchParams] = useQueryParams({
    t: withDefault(StringParam, UserTabsEnum.UserRoles),
    name: withDefault(StringParam, ''),
  });

  const tabItems: TabsProps['items'] = [
    {
      key: UserTabsEnum.UserRoles,
      label: 'Nhóm quyền',
      children: <UserRolesContent />,
    },
    {
      key: UserTabsEnum.UserActivities,
      label: 'Quyền đặc biệt',
      children: <UserActivitiesContent />,
    },
  ];

  return (
    <Container showBack={{ enabled: true, link: '/role-control/users' }} title={searchParams.name}>
      <Tabs
        type='card'
        items={tabItems}
        activeKey={searchParams.t}
        onChange={(activeKey) => setSearchParams({ [searchParamKeys.USERS_TAB]: activeKey })}
      />
    </Container>
  );
};

export default User;

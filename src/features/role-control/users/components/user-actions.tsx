import { Input, Space } from 'antd';
import debounce from 'lodash/debounce';
import { useQueryParams, withDefault, NumberParam, StringParam } from 'use-query-params';
import { searchParamKeys } from '~/constants/searchParamKeys';

import AddUserModal from '~/features/role-control/users/components/add-user-modal';

const UserActions = () => {
  const [searchParams, setSearchParams] = useQueryParams({
    [searchParamKeys.PAGE]: withDefault(NumberParam, 1),
    [searchParamKeys.KEYWORD]: withDefault(StringParam, ''),
  });

  return (
    <Space>
      <AddUserModal />
      <Input
        size='large'
        className='max-w-[12rem]'
        placeholder='Tìm kiếm...'
        defaultValue={searchParams.keyword}
        onChange={debounce((e) => {
          setSearchParams({
            [searchParamKeys.KEYWORD]: e.target.value || undefined,
            [searchParamKeys.PAGE]: undefined,
          });
        }, 500)}
      />
    </Space>
  );
};

export default UserActions;

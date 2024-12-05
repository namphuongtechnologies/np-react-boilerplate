import { Input, Space } from 'antd';
import debounce from 'lodash/debounce';
import { withDefault, StringParam, useQueryParams, NumberParam } from 'use-query-params';

import { searchParamKeys } from '~/constants/searchParamKeys';
import CreateRoleModal from '~/features/role-control/roles/components/create-role-modal';

const RoleActions = () => {
  const [searchParams, setSearchParams] = useQueryParams({
    [searchParamKeys.PAGE]: withDefault(NumberParam, 1),
    [searchParamKeys.KEYWORD]: withDefault(StringParam, ''),
  });

  return (
    <Space>
      <CreateRoleModal />
      <Input
        size='large'
        className='max-w-[12rem]'
        placeholder='Tìm kiếm...'
        defaultValue={searchParams[searchParamKeys.KEYWORD]}
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

export default RoleActions;

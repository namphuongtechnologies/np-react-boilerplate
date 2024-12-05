import { Input, Space } from 'antd';
import debounce from 'lodash/debounce';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import { searchParamKeys } from '~/constants/searchParamKeys';
import CreateActivityModal from './create-activity-modal';

const ActivityActions = () => {
  const [searchParams, setSearchParams] = useQueryParams({
    [searchParamKeys.PAGE]: withDefault(NumberParam, 1),
    [searchParamKeys.KEYWORD]: withDefault(StringParam, ''),
  });

  return (
    <Space>
      <CreateActivityModal />
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

export default ActivityActions;

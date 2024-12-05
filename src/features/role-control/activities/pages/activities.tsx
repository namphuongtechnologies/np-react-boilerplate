import { useQueryParams, NumberParam, StringParam, withDefault } from 'use-query-params';

import { useActivities } from '../hooks/activities/queries/use-activities';

import ActivityActions from '../components/activity-actions';
import ActivitiesTable from '../components/activities-table';
import ErrorPage from '~/components/errors/error-page';
import { searchParamKeys } from '~/constants/searchParamKeys';
import { Container } from '~/components/ui/container';

const Permissions = () => {
  const [searchParams, setSearchParams] = useQueryParams({
    pageIndex: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 10),
    keyword: withDefault(StringParam, ''),
  });

  const { data, isError, isLoading, error } = useActivities();

  if (isError) return <ErrorPage subTitle={error.message} />;

  return (
    <Container title='Quyền' extraRight={<ActivityActions />}>
      <ActivitiesTable
        loading={isLoading}
        dataSource={data?.Data}
        pagination={{
          total: data?.TotalRecord ?? 0,
          pageSize: searchParams.pageSize,
          current: searchParams.pageIndex,
          hideOnSinglePage: true,
          onChange: (page, pageSize) =>
            setSearchParams({
              [searchParamKeys.PAGE]: page,
              [searchParamKeys.PAGE_SIZE]: pageSize,
            }),
        }}
      />
    </Container>
  );
};

export default Permissions;

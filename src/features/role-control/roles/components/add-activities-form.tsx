import { App, Button, Flex, Input, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import type { Key } from 'react';

// import { useSearchState } from '../../hooks/use-search-state';
import { useActivities } from '~/features/role-control/activities/hooks/queries/use-activities';
import { useRoleActivities } from '~/features/role-control/roles/hooks/queries/use-role-activities';
import { useCreateRoleActivities } from '~/features/role-control/roles/hooks/mutations/use-create-role-activities';
import { ServiceMessage } from '~/utils/serviceMessage';
import { useSelectedRowKeys } from '~/hooks/useSelectedRowKeys';
import type { Activity } from '~/features/role-control/activities/types/Activity';

import ErrorPage from '~/components/errors/error-page';
import ActivitiesTable from '~/features/role-control/activities/components/activities-table';

const AddActivitiesForm = (props: { onCloseModal?: () => void }) => {
  const { onCloseModal = () => {} } = props;

  const { selectedRowKeys, rowSelectionProp } = useSelectedRowKeys<Activity>();

  const params = useParams<{ id: string }>();
  const { message } = App.useApp();
  // const { values, onKeywordChange, onPaginationChange, getPaginationProps } = useSearchState();
  const {
    isLoading: isActivitiesLoading,
    isError: isActivitiesError,
    error: activitiesError,
    data: resActivities,
  } = useActivities();
  const { data: resRoleActivities } = useRoleActivities(params.id);
  const {
    mutate: createRoleActivities,
    isPending: isCreateRoleActivitiesPending,
    invalidate,
  } = useCreateRoleActivities();

  const existingRoleActivities = resRoleActivities?.data?.Data?.Activities ?? [];

  const onConfirm = () => {
    const mappedRoleActivities = selectedRowKeys.map((key: Key) => ({
      Id: key,
      C: true,
      R: true,
      U: true,
      D: true,
    }));
    if (!params.id || mappedRoleActivities.length === 0) return;
    createRoleActivities(
      { roleId: params.id, activities: mappedRoleActivities },
      {
        async onSuccess(response) {
          await invalidate(params.id);
          message.success(ServiceMessage.success(response).message);
          onCloseModal();
        },
        onError(error) {
          message.error(ServiceMessage.error(error).message);
        },
      }
    );
  };

  const loading = isActivitiesLoading || isCreateRoleActivitiesPending;

  if (isActivitiesError) {
    return <ErrorPage subTitle={activitiesError.message} />;
  }

  return (
    <Spin spinning={loading}>
      <div className='space-y-4'>
        <Flex align='end' justify='space-between'>
          <span className='text-base'>Đã chọn: {selectedRowKeys.length}</span>
          <Input className='max-w-[12rem]' placeholder='Tìm kiếm...' />
        </Flex>
        <ActivitiesTable
          showOperators={false}
          rowSelection={{
            ...rowSelectionProp,
            getCheckboxProps: (record) => ({
              disabled: existingRoleActivities.some((i) => i.ActivityId === record.Id),
            }),
          }}
          dataSource={resActivities?.Data}
          // pagination={getPaginationProps({
          //   total: resActivities?.TotalRecord,
          //   onChange: (page, pageSize) => onPaginationChange({ pageIndex: page, pageSize }),
          // })}
        />
        <Flex className='mt-4' align='center' justify='end' gap='small'>
          <Button onClick={onCloseModal}>Đóng</Button>
          <Button type='primary' onClick={onConfirm}>
            Xác nhận
          </Button>
        </Flex>
      </div>
    </Spin>
  );
};

export default AddActivitiesForm;

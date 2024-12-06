import { App, Button, Flex, Input, Spin } from 'antd';
import { useParams } from 'react-router-dom';

import { useActivities } from '~/features/role-control/activities/hooks/queries/use-activities';
import { useCreateUserActivities } from '~/features/role-control/users/hooks/mutations/use-create-user-activities';
import { useUserActivities } from '~/features/role-control/users/hooks/queries/use-user-activities';
import { useSelectedRowKeys } from '~/hooks/useSelectedRowKeys';
import type { Activity } from '~/features/role-control/activities/types/Activity';
import { ServiceMessage } from '~/utils/serviceMessage';

import ActivitiesTable from '~/features/role-control/activities/components/activities-table';

const AddUserActivitiesForm = (props: { onCloseModal?: () => void }) => {
  const { onCloseModal = () => {} } = props;
  const params = useParams<{ id: string }>();
  const { message } = App.useApp();
  // const { values, onKeywordChange, onPaginationChange, getPaginationProps } = useSearchState();
  const { activities } = useActivities();
  const {
    mutate: createUserActivities,
    isPending: isCreateUserActivitiesPending,
    invalidate: invalidateCreateUserActivities,
  } = useCreateUserActivities();
  const { userActivities, isLoading: isUserActivitiesLoading } = useUserActivities(params.id);
  const { selectedRowKeys, rowSelectionProp } = useSelectedRowKeys<Activity>();

  const onConfirm = () => {
    if (!params.id || selectedRowKeys.length === 0) return;
    const mappedUserActivities = selectedRowKeys.map((rowKey) => ({
      Id: rowKey,
      C: true,
      R: true,
      U: true,
      D: true,
    }));
    createUserActivities(
      { userId: params.id, activities: mappedUserActivities },
      {
        onSuccess(response) {
          invalidateCreateUserActivities(params.id);
          message.success(ServiceMessage.success(response).message);
          onCloseModal();
        },
        onError(error) {
          message.error(ServiceMessage.error(error).message);
        },
      }
    );
  };

  const loading = isCreateUserActivitiesPending || isUserActivitiesLoading;

  return (
    <Spin spinning={loading}>
      <div className='space-y-4'>
        <Flex justify='space-between' align='center'>
          <span className='text-base'>Đã chọn: {selectedRowKeys.length}</span>
          <Input className='max-w-[12rem]' placeholder='Tìm kiếm...' />
        </Flex>
        <ActivitiesTable
          dataSource={activities}
          showOperators={false}
          rowSelection={{
            ...rowSelectionProp,
            getCheckboxProps: (record) => ({
              disabled: userActivities.some((i) => i.ActivityId === record.Id),
            }),
          }}
          // pagination={getPaginationProps({
          //   total: resActivities?.TotalRecord,
          //   onChange: (page, pageSize) => onPaginationChange({ pageIndex: page, pageSize }),
          // })}
        />
        <Flex justify='end' gap='small'>
          <Button onClick={onCloseModal}>Đóng</Button>
          <Button type='primary' onClick={onConfirm}>
            Xác nhận
          </Button>
        </Flex>
      </div>
    </Spin>
  );
};

export default AddUserActivitiesForm;

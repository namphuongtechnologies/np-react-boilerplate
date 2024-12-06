import { useEffect, useState } from 'react';
import { App, Button, Form, Space } from 'antd';
import { useParams } from 'react-router-dom';

import { useSelectedRowKeys } from '~/hooks/useSelectedRowKeys';
import { ServiceMessage } from '~/utils/serviceMessage';
import { useUpdateUserActivities } from '~/features/role-control/users/hooks/mutations/use-update-user-activities';
import { useUserActivities } from '~/features/role-control/users/hooks/queries/use-user-activities';
import type { UserActivity } from '~/features/role-control/users/types/User';

import AddUserActivitiesModal from '~/features/role-control/users/components/add-user-activities-modal';
import DeleteUserActivitiesConfirmation from '~/features/role-control/users/components/delete-user-activities-confirmation';
import ErrorPage from '~/components/errors/error-page';
import Container from '~/components/ui/container';
import RoleActivityList from '~/features/role-control/activities/components/role-activity-list';

const UserActivitiesContent = () => {
  const [editing, setEditing] = useState(false);

  const [form] = Form.useForm();
  const params = useParams<{ id: string }>();
  const {
    userActivities,
    isLoading: isUserActivitiesLoading,
    isError: isUserActivitiesError,
    error: userActivitiesError,
  } = useUserActivities(params.id);
  const { message } = App.useApp();
  const {
    mutate: updateUserActivities,
    isPending: isUpdateUserActivities,
    invalidate,
  } = useUpdateUserActivities();
  const { selectedRowKeys, rowSelectionProp, resetSelectedRowKeys } =
    useSelectedRowKeys<UserActivity>();

  const cancelEditing = () => {
    form.setFieldsValue({ activities: userActivities });
    setEditing(false);
  };

  const onFinish = (values: { activities: UserActivity[] }) => {
    updateUserActivities(values.activities, {
      onSuccess(response) {
        invalidate(params.id);
        setEditing(false);
        message.success(ServiceMessage.success(response).message);
      },
      onError(error) {
        message.error(ServiceMessage.error(error).message);
      },
    });
  };

  const loading = isUserActivitiesLoading || isUpdateUserActivities;

  useEffect(() => {
    form.setFieldsValue({ activities: userActivities });
  }, [userActivities, form]);

  if (isUserActivitiesError) return <ErrorPage subTitle={userActivitiesError.message} />;

  return (
    <Form form={form} onFinish={onFinish}>
      <Container
        extraRight={
          editing ? (
            <Space>
              <DeleteUserActivitiesConfirmation
                userActivityIds={selectedRowKeys}
                resetSelectedRowKeys={resetSelectedRowKeys}
              />
              <Button onClick={cancelEditing}>Hủy bỏ</Button>
              <Button htmlType='submit' type='primary'>
                Lưu thay đổi
              </Button>
            </Space>
          ) : (
            <Space>
              <DeleteUserActivitiesConfirmation
                userActivityIds={selectedRowKeys}
                resetSelectedRowKeys={resetSelectedRowKeys}
              />
              <Button onClick={() => setEditing(true)}>Cập nhật</Button>
              <AddUserActivitiesModal />
            </Space>
          )
        }
      >
        <Form.Item name='activities' valuePropName='dataSource'>
          <RoleActivityList
            loading={loading}
            editing={editing}
            rowSelection={rowSelectionProp}
            pagination={{ hideOnSinglePage: true }}
          />
        </Form.Item>
      </Container>
    </Form>
  );
};

export default UserActivitiesContent;

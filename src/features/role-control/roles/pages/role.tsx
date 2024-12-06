import { useParams } from 'react-router-dom';
import { App, Button, Form, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { useSelectedRowKeys } from '~/hooks/useSelectedRowKeys';
import { ServiceMessage } from '~/utils/serviceMessage';
import { useUpdateRoleActivities } from '~/features/role-control/roles/hooks/mutations/use-update-role-activities';
import { useRoleActivities } from '~/features/role-control/roles/hooks/queries/use-role-activities';
import type { Activity } from '~/features/role-control/activities/types/Activity';
import type { RoleActivity } from '~/features/role-control/roles/types/RoleActivity';

import Container from '~/components/ui/container';
import ErrorPage from '~/components/errors/error-page';
import AddActivitiesModal from '~/features/role-control/roles/components/add-activities-modal';
import DeleteRoleActivitiesConfirmation from '~/features/role-control/roles/components/delete-role-activities-confirmation';
import RoleActivityList from '~/features/role-control/activities/components/role-activity-list';

const Role = () => {
  const [editing, setEditing] = useState(false);

  const [form] = Form.useForm();
  const { message } = App.useApp();
  const params = useParams<{ id: string }>();

  const {
    data: resRoleActivities,
    isLoading: isRoleActivitiesLoading,
    isError: isRoleActivityError,
    error: RoleActivityError,
  } = useRoleActivities(params.id);

  const {
    mutate: updateRoleActivities,
    isPending: isUpdateRoleActivitiesPending,
    invalidate: invalidateRoleActivities,
  } = useUpdateRoleActivities();

  const { selectedRowKeys, rowSelectionProp, resetSelectedRowKeys } =
    useSelectedRowKeys<Activity>();

  const cancelEditing = () => {
    form.setFieldsValue({ activities: resRoleActivities?.data?.Data?.Activities ?? [] });
    setEditing(false);
  };

  const onFinish = (values: { activities: RoleActivity[] }) => {
    updateRoleActivities(values.activities, {
      onSuccess(response) {
        setEditing(false);
        resetSelectedRowKeys();
        invalidateRoleActivities(params.id);
        message.success(ServiceMessage.success(response).message);
      },
      onError(error) {
        message.error(ServiceMessage.error(error).message);
      },
    });
  };

  const activities = useMemo(
    () => resRoleActivities?.data?.Data?.Activities ?? [],
    [resRoleActivities]
  );

  const loading = isRoleActivitiesLoading || isUpdateRoleActivitiesPending;

  useEffect(() => {
    form.setFieldsValue({ activities });
  }, [form, activities]);

  if (isRoleActivityError) return <ErrorPage subTitle={RoleActivityError.message} />;

  return (
    <Form form={form} initialValues={{ activities }} onFinish={onFinish}>
      <Container
        showBack={{ enabled: true, link: '/role-control/roles' }}
        title={resRoleActivities?.data?.Data?.RoleName}
        extraRight={
          editing ? (
            <Space>
              <DeleteRoleActivitiesConfirmation
                roleActivitiyKeys={selectedRowKeys as string[]}
                resetSelectedRowKeys={resetSelectedRowKeys}
              />
              <Button size='large' onClick={cancelEditing}>
                Hủy bỏ
              </Button>
              <Button htmlType='submit' type='primary' size='large'>
                Lưu thay đổi
              </Button>
            </Space>
          ) : (
            <Space>
              <DeleteRoleActivitiesConfirmation
                roleActivitiyKeys={selectedRowKeys as string[]}
                resetSelectedRowKeys={resetSelectedRowKeys}
              />
              <Button size='large' onClick={() => setEditing(true)}>
                Cập nhật
              </Button>
              <AddActivitiesModal />
            </Space>
          )
        }
      >
        <Form.Item noStyle name='activities' valuePropName='dataSource'>
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

export default Role;

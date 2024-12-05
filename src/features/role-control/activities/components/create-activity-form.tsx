import { App, Button, Col, Flex, Form, Input, Row, Spin } from 'antd';

import type { Activity } from '~/features/role-control/activities/types/Activity';
import { ServiceMessage } from '~/utils/serviceMessage';

import { useCreateActivity } from '~/features/role-control/activities/hooks/mutations/use-create-activity';
import { useUpdateActivity } from '~/features/role-control/activities/hooks/mutations/use-update-activity';

interface Props {
  onCloseModal?: () => void;
  activity?: Activity;
}

type ActivityFormType = Omit<Activity, 'id'>;

const CreateActivityForm = (props: Props) => {
  const { onCloseModal = () => {}, activity } = props;

  const { message } = App.useApp();
  const {
    mutate: createActivity,
    isPending: isCreateActivityPending,
    invalidate: createActivityInvalidate,
  } = useCreateActivity();
  const {
    mutate: updateActivity,
    isPending: isUpdateActivityPending,
    invalidate: updateActivityInvalidate,
  } = useUpdateActivity();

  const isEditSession = Boolean(activity?.Id);

  const handleCreateActivity = (values: ActivityFormType) => {
    createActivity(
      { ...values, Code: values?.Code?.trim(), Name: values?.Name?.trim() },
      {
        onSuccess: (response) => {
          createActivityInvalidate();
          message.success(ServiceMessage.success(response).message);
          onCloseModal();
        },
        onError: (error) => {
          message.error(ServiceMessage.error(error).message);
        },
      }
    );
  };
  const handleUpdateActivity = (values: ActivityFormType) => {
    if (!activity?.Id) return;
    updateActivity(
      { ...values, Id: activity.Id, Code: values?.Code?.trim(), Name: values?.Name?.trim() },
      {
        onSuccess: (response) => {
          updateActivityInvalidate();
          message.success(ServiceMessage.success(response).message);
          onCloseModal();
        },
        onError: (error) => {
          message.error(ServiceMessage.error(error).message);
        },
      }
    );
  };

  const onFinish = (values: ActivityFormType) => {
    if (isEditSession) handleUpdateActivity(values);
    else handleCreateActivity(values);
  };

  const loading = isCreateActivityPending || isUpdateActivityPending;

  return (
    <Spin spinning={loading}>
      <Form size='large' layout='vertical' initialValues={activity} onFinish={onFinish}>
        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item<ActivityFormType>
              name='Code'
              label='Code'
              rules={[
                { required: true, message: 'Trường này là bắt buộc' },
                { max: 25, message: 'Tối đa 25 ký tự' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ActivityFormType>
              name='Name'
              label='Quyền'
              rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ActivityFormType> name='Description' label='Mô tả'>
              <Input.TextArea rows={6} />
            </Form.Item>
          </Col>
        </Row>
        <Flex gap='small' justify='end'>
          <Button size='middle' onClick={onCloseModal}>
            Đóng
          </Button>
          <Button htmlType='submit' size='middle' type='primary'>
            Xác nhận
          </Button>
        </Flex>
      </Form>
    </Spin>
  );
};

export default CreateActivityForm;

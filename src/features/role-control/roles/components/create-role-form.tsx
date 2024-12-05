import { App, Col, Flex, Form, Input, Row, Spin, Button } from 'antd';

import type { Role } from '~/features/role-control/roles/types/Role';
import { useCreateRole } from '~/features/role-control/roles/hooks/mutations/use-create-role';
import { useUpdateRole } from '~/features/role-control/roles/hooks/mutations/use-update-role';
import { ServiceMessage } from '~/utils/serviceMessage';

interface Props {
  onCloseModal?: () => void;
  role?: Role;
}

type RoleFormType = Omit<Role, 'id' | 'Id'>;

const CreateRoleForm = (props: Props) => {
  const { onCloseModal = () => {}, role } = props;

  const { message } = App.useApp();
  const {
    mutate: createRole,
    isPending: isCreateRolePending,
    invalidate: invalidateCreateRoleQueries,
  } = useCreateRole();
  const {
    mutate: updateRole,
    isPending: isUpdateRolePending,
    invalidate: invalidateUpdateRoleQueries,
  } = useUpdateRole();

  const isEditSession = Boolean(role?.Id);

  const handleCreateRole = (values: RoleFormType) => {
    createRole(values, {
      onSuccess: (response) => {
        invalidateCreateRoleQueries();
        message.success(ServiceMessage.success(response).message);
        onCloseModal();
      },
      onError: (error) => {
        message.error(ServiceMessage.error(error).message);
      },
    });
  };
  const handleUpdateRole = (values: RoleFormType) => {
    if (!role?.Id) return;
    updateRole(
      { Id: role.Id, ...values },
      {
        onSuccess: (response) => {
          invalidateUpdateRoleQueries();
          message.success(ServiceMessage.success(response).message);
          onCloseModal();
        },
        onError: (error) => {
          message.error(ServiceMessage.error(error).message);
        },
      }
    );
  };

  const onFinish = (values: RoleFormType) => {
    if (isEditSession) handleUpdateRole(values);
    else handleCreateRole(values);
  };

  const loading = isCreateRolePending || isUpdateRolePending;

  return (
    <Spin spinning={loading}>
      <Form size='large' layout='vertical' initialValues={role} onFinish={onFinish}>
        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item<RoleFormType> name='Name' label='Nhóm quyền'>
              <Input placeholder='Nhập tên nhóm quyền...' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<RoleFormType> name='Description' label='Mô tả'>
              <Input.TextArea placeholder='Nhập mô tả...' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<RoleFormType> name='Note' label='Ghi chú'>
              <Input.TextArea placeholder='Nhập ghi chú...' />
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

export default CreateRoleForm;

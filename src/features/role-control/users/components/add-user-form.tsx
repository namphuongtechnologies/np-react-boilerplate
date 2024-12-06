import { App, Button, Flex, Form, Input, Skeleton, Spin } from 'antd';
import { VN_PHONE_REGEX } from '@namphuongtechnologi/utils';

import { ServiceMessage } from '~/utils/serviceMessage';
import { useCreateUser } from '~/features/role-control/users/hooks/mutations/use-create-user';
import { useUpdateUser } from '~/features/role-control/users/hooks/mutations/use-update-user';
import { useUser } from '~/features/role-control/users/hooks/queries/use-user';
import type { User } from '~/features/role-control/users/types/User';

import AvatarUser from '~/features/role-control/users/components/avatar-user';

interface Props {
  onCloseModal?: () => void;
  user?: User;
}

export type UserFormType = Required<Omit<User, 'Id' | 'FullName' | 'HrId'>>;

const AddUserForm = (props: Props) => {
  const { onCloseModal = () => {}, user } = props;

  const [form] = Form.useForm();
  const { data: resUser, isLoading: isUserLoading } = useUser(user?.Id);
  const { message } = App.useApp();

  const {
    mutate: createUser,
    isPending: isCreateUserPending,
    invalidate: invalidateCreateUser,
  } = useCreateUser();

  const {
    mutate: updateUser,
    isPending: isUpdateUserPending,
    invalidate: invalidateUpdateUser,
  } = useUpdateUser();

  const isEditSession = Boolean(user?.Id);

  const onUpdateUser = (values: UserFormType) => {
    if (!user?.Id) return;
    const formData = new FormData();
    if (typeof values.Avatar !== 'string') {
      formData.append('Avatar', values.Avatar);
    }
    formData.append('Code', values.Code);
    formData.append('UserName', values.UserName);
    formData.append('FirstName', values.FirstName);
    formData.append('LastName', values.LastName);
    formData.append('PhoneNumber', values.PhoneNumber);
    formData.append('Email', values.Email);
    formData.append('Base', values.Base);
    formData.append('Group', values.Group);
    formData.append('Note', values.Note);

    updateUser(
      { id: user.Id, formData },
      {
        onSuccess(response) {
          invalidateUpdateUser();
          onCloseModal();
          message.success(ServiceMessage.success(response).message);
        },
        onError(error) {
          message.error(ServiceMessage.error(error).message);
        },
      }
    );
  };

  const onAddUser = (values: UserFormType) => {
    const formData = new FormData();
    if (typeof values.Avatar !== 'string') {
      formData.append('Avatar', values.Avatar);
    }
    formData.append('Code', values.Code);
    formData.append('UserName', values.UserName);
    formData.append('FirstName', values.FirstName);
    formData.append('LastName', values.LastName);
    formData.append('PhoneNumber', values.PhoneNumber);
    formData.append('Email', values.Email);
    formData.append('Base', values.Base);
    formData.append('Group', values.Group);
    formData.append('Note', values.Note);

    createUser(formData, {
      onSuccess(response) {
        invalidateCreateUser();
        message.success(ServiceMessage.success(response).message);
        onCloseModal();
      },
      onError(error) {
        message.error(ServiceMessage.error(error).message);
      },
    });
  };

  const onFinish = (values: UserFormType) => {
    if (isEditSession) {
      onUpdateUser(values);
    } else {
      onAddUser(values);
    }
  };

  const loading = isCreateUserPending || isUpdateUserPending || isUserLoading;

  if (isUserLoading) return <Skeleton avatar paragraph={{ rows: 4 }} />;

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        size='large'
        layout='vertical'
        onFinish={onFinish}
        initialValues={{ ...resUser?.data?.Data }}
      >
        <div className='mb-4 grid grid-cols-1 gap-x-2 md:grid-cols-2 xl:grid-cols-3'>
          <Form.Item
            name='Avatar'
            className='grid place-items-center md:col-span-2 xl:col-span-1 xl:row-span-2'
          >
            <AvatarUser src={resUser?.data?.Data?.Avatar} />
          </Form.Item>
          <Form.Item<UserFormType>
            label='Code'
            name='Code'
            rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
          >
            <Input placeholder='Code' />
          </Form.Item>
          <Form.Item<UserFormType>
            label='Username'
            name='UserName'
            rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
          >
            <Input placeholder='Username' />
          </Form.Item>
          <Form.Item<UserFormType>
            label='Tên'
            name='FirstName'
            rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
          >
            <Input placeholder='Fist Name' />
          </Form.Item>
          <Form.Item<UserFormType>
            label='Họ'
            name='LastName'
            rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
          >
            <Input placeholder='Last Name' />
          </Form.Item>
          <Form.Item<UserFormType> label='Nơi làm việc' name='Base'>
            <Input placeholder='Base' />
          </Form.Item>
          <Form.Item<UserFormType>
            label='Số điện thoại'
            name='PhoneNumber'
            rules={[
              { required: true, message: 'Trường này là bắt buộc' },
              { pattern: VN_PHONE_REGEX, message: 'Trường này phải là số điện thoại' },
            ]}
          >
            <Input placeholder='Phone' />
          </Form.Item>
          <Form.Item<UserFormType>
            label='Email'
            name='Email'
            rules={[
              { required: true, message: 'Trường này là bắt buộc' },
              { type: 'email', message: 'Trường này phải là email' },
            ]}
          >
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item<UserFormType>
            label='Nhóm'
            name='Group'
            className='md:col-span-2 xl:col-span-3'
          >
            <Input placeholder='Group' />
          </Form.Item>
          <Form.Item<UserFormType>
            label='Ghi chú'
            name='Note'
            className='md:col-span-2 xl:col-span-3'
          >
            <Input.TextArea rows={4} placeholder='Nhập' />
          </Form.Item>
        </div>
        <Flex align='center' gap='middle' justify='end'>
          <Button size='middle' onClick={onCloseModal}>
            Hủy
          </Button>
          <Button size='middle' htmlType='submit' type='primary'>
            Xác nhận
          </Button>
        </Flex>
      </Form>
    </Spin>
  );
};

export default AddUserForm;

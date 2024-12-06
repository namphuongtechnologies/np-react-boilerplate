import type { TableProps } from 'antd';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQueryParams, withDefault, NumberParam, StringParam } from 'use-query-params';

import type { User } from '~/features/role-control/users/types/User';
import { useUsers } from '~/features/role-control/users/hooks/queries/use-users';

import UserListOperators from '~/features/role-control/users/components/user-list-operators';
import ErrorPage from '~/components/errors/error-page';

interface Props extends TableProps {}

const UserList = (props: Props) => {
  const { ...tableProps } = props;

  const navigate = useNavigate();

  const [searchParams] = useQueryParams({
    pageIndex: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 10),
    keyword: withDefault(StringParam, ''),
  });

  const {
    data: resUsers,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersErrors,
  } = useUsers({
    pageIndex: searchParams.pageIndex,
    pageSize: searchParams.pageSize,
    keyword: searchParams.keyword,
  });

  const columns: TableProps<User>['columns'] = [
    {
      title: '',
      dataIndex: 'operators',
      key: 'operators',
      width: 100,
      align: 'center' as const,
      render: (_: unknown, record: User) => <UserListOperators user={record} />,
    },
    {
      title: 'Username',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'FullName',
      key: 'FullName',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
    },
  ];

  const loading = isUsersLoading;

  if (isUsersError) {
    return <ErrorPage subTitle={usersErrors.message} />;
  }

  return (
    <Table
      bordered
      rowKey='Id'
      loading={loading}
      columns={columns}
      dataSource={resUsers?.data?.Data}
      // pagination={{
      //   total: resUsers?.data?.TotalRecord,
      //   pageSize: searchParams.pageSize,
      //   current: searchParams.pageIndex,
      //   hideOnSinglePage: true,
      //   onChange: (page, pageSize) =>
      //     setSearchParams({
      //       [searchParamKeys.PAGE_INDEX]: page,
      //       [searchParamKeys.PAGE_SIZE]: pageSize,
      //     }),
      // }}
      onRow={(record) => ({
        onClick: () => navigate(`/role-control/users/${record.Id}?name=${record.FullName}`),
        style: { cursor: 'pointer' },
      })}
      {...tableProps}
    />
  );
};

export default UserList;

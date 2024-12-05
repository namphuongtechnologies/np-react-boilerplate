import { memo } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { useQueryParams, withDefault, NumberParam, StringParam } from 'use-query-params';
import { useNavigate } from 'react-router-dom';

import type { Role } from '~/features/role-control/roles/types/Role';
import { useRoles } from '~/features/role-control/roles/hooks/queries/use-roles';
import { DateFormats } from '~/constants/dateFormats';

import ErrorPage from '~/components/errors/error-page';
import RoleListOperators from '~/features/role-control/roles/components/role-list-operators';

interface Props extends TableProps<Role> {
  showOperators?: boolean;
}

export const RoleList = memo((props: Props) => {
  const { showOperators = true, ...tableProps } = props;

  const navigate = useNavigate();
  const [searchParams] = useQueryParams({
    pageIndex: withDefault(NumberParam, 1),
    pageSize: withDefault(NumberParam, 10),
    keyword: withDefault(StringParam, ''),
  });

  const {
    data: resRoles,
    isLoading: isRolesLoading,
    isError: isRolesError,
    error: rolesError,
  } = useRoles({
    pageIndex: searchParams.pageIndex,
    pageSize: searchParams.pageSize,
    keyword: searchParams.keyword,
  });

  const columns = [
    {
      title: '',
      dataIndex: 'operators',
      key: 'operators',
      width: 50,
      align: 'center' as const,
      render: (_: unknown, role: Role) => <RoleListOperators role={role} />,
    },
    {
      title: 'Nhóm quyền',
      dataIndex: 'Name',
      key: 'Name',
      width: 150,
    },
    {
      title: 'Mô tả',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'Note',
      key: 'Note',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
      width: 100,
      align: 'center' as const,
      render: (datetime: string) => <span>{dayjs(datetime).format(DateFormats.VI_DATE)}</span>,
    },
  ];

  const filteredColumns = columns.filter((col) => {
    if (showOperators) return true;
    return col.key !== 'operators';
  });

  const loading = isRolesLoading;
  if (isRolesError) return <ErrorPage subTitle={rolesError.message} />;

  return (
    <Table
      loading={loading}
      bordered
      rowKey='Id'
      columns={filteredColumns}
      dataSource={resRoles?.Data}
      scroll={{ x: 1050 }}
      onRow={(role: Role) => ({
        className: 'cursor-pointer',
        onClick: () => navigate(`/role-control/roles/${role.Id}`),
      })}
      // pagination={{
      //   total: resRoles?.TotalRecord,
      //   pageSize: searchParams.pageSize,
      //   current: searchParams.pageIndex,
      //   hideOnSinglePage: true,
      //   onChange: (page, pageSize) =>
      //     setSearchParams({
      //       [searchParamKeys.PAGE]: page,
      //       [searchParamKeys.PAGE_SIZE]: pageSize,
      //     }),
      // }}
      {...tableProps}
    />
  );
});

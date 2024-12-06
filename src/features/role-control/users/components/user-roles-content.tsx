import { Flex, Space, Spin } from 'antd';
import { useParams } from 'react-router-dom';

import { useUserRoles } from '~/features/role-control/users/hooks/queries/use-user-roles';
import { useSelectedRowKeys } from '~/hooks/useSelectedRowKeys';
import type { Role } from '~/features/role-control/roles/types/Role';

import AddUserRolesModal from '~/features/role-control/users/components/add-user-roles-modal';
import ErrorPage from '~/components/errors/error-page';
import DeleteUserRolesConfirmation from '~/features/role-control/users/components/delete-user-roles-confirmation';
import RoleList from '~/features/role-control/roles/components/role-list';

const UserRolesContent = () => {
  const params = useParams<{ id: string }>();
  const {
    data: resUserRoles,
    isLoading: isUserRolesLoading,
    isError: isUserRolesError,
    error: userRolesError,
  } = useUserRoles(params.id);

  const { selectedRowKeys, resetSelectedRowKeys, rowSelectionProp } = useSelectedRowKeys<Role>();

  const loading = isUserRolesLoading;
  if (isUserRolesError) {
    return <ErrorPage subTitle={userRolesError.message} />;
  }

  return (
    <Spin spinning={loading}>
      <div className='space-y-4'>
        <Flex justify='end'>
          <Space>
            <DeleteUserRolesConfirmation
              userRoleIds={selectedRowKeys as string[]}
              resetSelectedRowKeys={resetSelectedRowKeys}
            />
            <AddUserRolesModal />
          </Space>
        </Flex>
        <RoleList
          showOperators={false}
          dataSource={resUserRoles?.data?.Data}
          rowSelection={rowSelectionProp}
          // pagination={{ total: resUserRoles?.data?.TotalRecord, hideOnSinglePage: true }}
          onRow={() => ({ onClick: () => {} })}
        />
      </div>
    </Spin>
  );
};

export default UserRolesContent;

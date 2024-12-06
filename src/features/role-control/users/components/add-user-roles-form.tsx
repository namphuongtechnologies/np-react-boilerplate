import { App, Button, Flex, Input } from 'antd';
import { useParams } from 'react-router-dom';

import { useSelectedRowKeys } from '~/hooks/useSelectedRowKeys';
import type { Role } from '~/features/role-control/roles/types/Role';
import { useRoles } from '~/features/role-control/roles/hooks/queries/use-roles';
import { useUserRoles } from '~/features/role-control/users/hooks/queries/use-user-roles';
import { useCreateUserRoles } from '~/features/role-control/users/hooks/mutations/use-create-user-roles';
import { ServiceMessage } from '~/utils/serviceMessage';

import RoleList from '~/features/role-control/roles/components/role-list';

interface Props {
  onCloseModal?: () => void;
}

const AddUserRolesForm = (props: Props) => {
  const { onCloseModal = () => {} } = props;

  // const { values, onKeywordChange, onPaginationChange, getPaginationProps } = useSearchState();
  const { selectedRowKeys, rowSelectionProp } = useSelectedRowKeys<Role>();

  const params = useParams<{ id: string }>();
  const { message } = App.useApp();
  const { data: resRoles } = useRoles({});

  const { userRoles } = useUserRoles(params.id);
  const { mutate: createUserRoles, invalidate: invalidateCreateUserRoles } = useCreateUserRoles();

  const onConfirm = () => {
    createUserRoles(
      { userId: params.id!, roleIds: selectedRowKeys },
      {
        onSuccess: (response) => {
          invalidateCreateUserRoles(params.id);
          message.success(ServiceMessage.success(response).message);
          onCloseModal();
        },
        onError: (error) => {
          message.error(ServiceMessage.error(error).message);
        },
      }
    );
  };

  return (
    <div className='space-y-4'>
      <Flex justify='space-between' align='center'>
        <span className='text-base'>Đã chọn: {selectedRowKeys.length}</span>
        <Input className='max-w-[12rem]' placeholder='Tìm kiếm...' />
      </Flex>
      <RoleList
        dataSource={resRoles?.Data}
        showOperators={false}
        onRow={() => ({ onClick: () => {} })}
        rowSelection={{
          ...rowSelectionProp,
          getCheckboxProps: (record) => ({
            disabled: userRoles.some((i) => i.RoleId === record.Id),
          }),
        }}
        // pagination={getPaginationProps({
        //   total: resRoles?.TotalRecord,
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
  );
};

export default AddUserRolesForm;

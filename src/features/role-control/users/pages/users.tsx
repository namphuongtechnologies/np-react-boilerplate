import Container from '~/components/ui/container';
import UserActions from '~/features/role-control/users/components/user-actions';
import UserList from '~/features/role-control/users/components/user-list';

const Users = () => {
  return (
    <Container title='Người dùng' extraRight={<UserActions />}>
      <UserList />
    </Container>
  );
};

export default Users;

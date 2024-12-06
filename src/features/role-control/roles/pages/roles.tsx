import Container from '~/components/ui/container';
import RoleActions from '~/features/role-control/roles/components/role-actions';
import RoleList from '~/features/role-control/roles/components/role-list';

const RolesPage = () => {
  return (
    <Container title='Roles' extraRight={<RoleActions />}>
      <RoleList showOperators />
    </Container>
  );
};

export default RolesPage;

import { Container } from '../components/container';
import { RoleList, RoleActions } from '../components/roles';

const RolesPage = () => {
  return (
    <Container title='Roles' extraRight={<RoleActions />}>
      <RoleList showOperators />
    </Container>
  );
};

export default RolesPage;

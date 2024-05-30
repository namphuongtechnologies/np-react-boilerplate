import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className='text-2xl text-red-500'>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      SignIn
      <Link to='/auth/sign-up'>SignUp</Link>
    </div>
  );
};

export default SignIn;

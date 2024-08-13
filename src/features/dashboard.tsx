import { Link } from 'react-router-dom';

import { useAuthToken, useAuthUser } from '~/store/auth';

export default function Dashboard() {
  const isSignedIn = useAuthToken((store) => !!store.accessToken);
  const signOut = useAuthToken((store) => store.clear);

  const userName = useAuthUser((store) => store.name);

  return (
    <div>
      <h1>Dashboard</h1>
      {isSignedIn ? (
        <>
          <p>Tên tài khoản: {userName}</p>
          <button className='font-medium text-red-500' onClick={signOut}>
            Đăng xuất
          </button>
        </>
      ) : (
        <Link to='/auth/sign-in'>
          <button className='text-blue-500'>Đăng nhập</button>
        </Link>
      )}

      <ul className='flex flex-wrap gap-2'>
        <li>
          <Link to='/about'>
            <button>Giới thiệu</button>
          </Link>
        </li>
        <li>
          <Link to='/products'>
            <button>Sản phẩm</button>
          </Link>
        </li>
        <li>
          <Link to='/test'>
            <button>Test</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

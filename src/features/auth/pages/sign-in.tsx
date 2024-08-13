import type { OnLoginValues } from '@namphuongtechnologi/ui';
import { NPLogin } from '@namphuongtechnologi/ui';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';

import { useAuthToken, useAuthUser } from '~/store/auth';

const random = () => Math.random().toString(36);

const SignIn = () => {
  const setUser = useAuthUser((store) => store.setUser);
  const setToken = useAuthToken((store) => store.setToken);

  const pending = false;

  const onSubmit = ({ value }: OnLoginValues) => {
    setToken({
      accessToken: random(),
      refreshToken: random(),
    });

    setUser({
      id: random(),
      name: (value && typeof value === 'object' && 'username' in value
        ? value.username
        : random()) as string,
    });
  };

  const onSendCode = (values: OnLoginValues) => {
    console.log(values);
  };

  const onLoginGoogle = () => {
    console.log('onLoginGoogle');
  };

  return (
    <div className=''>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>

      <NPLogin
        title='Đăng nhập'
        description='Vui lòng nhập thông tin của bạn để đăng nhập'
        logo={
          {
            // src: '',
          }
        }
        bgPlaceholder={
          {
            // src: '',
          }
        }
        providers={[
          {
            providerType: 'google',
            disabled: pending,
            onClick: onLoginGoogle,
          },
        ]}
        authStrategy='passwords'
        onSubmit={onSubmit}
        onSendCode={onSendCode}
        passwordsConfig={{
          usernameText: 'Tên tài khoản',
          usernameZodSchema: z
            .string({ required_error: 'Yêu cầu tên tài khoản' })
            .trim()
            .min(1, { message: 'Yêu cầu tên tài khoản' }),
          usernameInputProps: {
            disabled: pending,
          },

          passwordText: 'Mật khẩu',
          passwordZodSchema: z
            .string({ required_error: 'Yêu cầu mật khẩu' })
            .min(1, { message: 'Yêu cầu mật khẩu' }),
          passwordInputProps: {
            disabled: pending,
          },
        }}
        loginBtnText='Đăng nhập'
        loginBtnProps={{
          disabled: pending,
        }}
      />
    </div>
  );
};

export default SignIn;

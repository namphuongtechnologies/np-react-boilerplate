import type { ResultProps } from 'antd';
import { Button, Result } from 'antd';

const ErrorPage = (props: ResultProps) => {
  const onReloadClick = () => window.location.reload();

  return (
    <Result
      status='500'
      title='500'
      subTitle='Xin lỗi, đã xảy ra lỗi xảy ra.'
      {...props}
      extra={
        <Button type='primary' onClick={onReloadClick}>
          Trở về trang chủ
        </Button>
      }
    />
  );
};

export default ErrorPage;

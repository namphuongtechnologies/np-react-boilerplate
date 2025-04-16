import type { PropsWithChildren } from 'react';

export const Button = ({ children }: PropsWithChildren) => {
  console.log('Button');
  return <button>{children}</button>;
};

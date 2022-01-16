import AuthFooter from 'components/layout-components/AuthFooter';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-container mx-auto min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center">{children}</div>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;

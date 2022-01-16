import classNames from 'utils/classNames';

const AuthFooter = () => {
  return (
    <div className={classNames('mb-10', 'text-center font-light text-sm text-slate-500')}>
      &copy; {new Date().getFullYear()} Dumore Labs Inc. All rights reserved.
    </div>
  );
};

export default AuthFooter;

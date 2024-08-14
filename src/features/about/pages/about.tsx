import { useHavePermission } from '@namphuongtechnologi/react';

import { User_Permission_Code } from '~/config/permission';

const About = () => {
  const havePermission = useHavePermission();

  const isHaveCreateAboutPermission = havePermission({
    [User_Permission_Code['ABOUT_ROUTE']]: ({ c }) => c,
  });

  return (
    <div>
      About
      {isHaveCreateAboutPermission && (
        <span className='text-red-500'>If you see this, you are have create about permission</span>
      )}
    </div>
  );
};

export default About;

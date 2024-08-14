import type { IUser_Permission } from '@namphuongtechnologi/react';
import {
  createRecordPermission,
  PermissionProvider as NPPermissionProvider,
} from '@namphuongtechnologi/react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import { User_Permission_Code } from '~/config/permission';

const mockupPermissions: IUser_Permission[] = [
  {
    code: User_Permission_Code['ABOUT_ROUTE'],
    c: true,
    r: true,
    u: false,
    d: false,
  },
  {
    code: User_Permission_Code['TEST_ROUTE'],
    c: false,
    r: false,
    u: false,
    d: false,
  },
];

export default function PermissionProvider({ children }: PropsWithChildren) {
  const [recordPermission] = useState(createRecordPermission(mockupPermissions, 'code'));

  return <NPPermissionProvider permission={recordPermission}>{children}</NPPermissionProvider>;
}

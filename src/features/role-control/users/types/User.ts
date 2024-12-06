export interface User {
  Id?: string;
  Email?: string;
  Code?: string;
  UserName?: string;
  PhoneNumber?: string;
  FullName?: string;
  FirstName?: string;
  LastName?: string;
  Avatar?: string;
  HrId?: number;
  Group?: string;
  Base?: string;
  Note?: string;
}

export interface UserRole {
  CreatedDate?: string;
  Creator?: string | null;
  Description?: string;
  Id?: string;
  Name: string;
  Note?: null | string;
  RoleId: string;
}

export interface UserActivity {
  Id?: string;
  C?: boolean;
  R?: boolean;
  U?: boolean;
  D?: boolean;
  ActivityId?: string;
  ActivityName?: string;
}

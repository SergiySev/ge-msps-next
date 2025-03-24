import 'next-auth';

// Define the base user type
interface BaseUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  hospitalId: number;
  hospitalName: string;
  role: 'admin' | 'manager' | 'doctor' | 'nurse';
}

declare module 'next-auth' {
  interface User extends BaseUser {}

  interface Session {
    user: BaseUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends BaseUser {}
}

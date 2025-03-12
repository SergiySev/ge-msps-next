import 'next-auth';
import { staff_role } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: staff_role;
    hospitalId: number | null;
    hospitalName?: string;
  }

  interface Session {
    user: User & {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      role: staff_role;
      hospitalId: number | null;
      hospitalName?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    firstName: string;
    lastName: string;
    username: string;
    role: staff_role;
    hospitalId: number | null;
    hospitalName?: string;
  }
}

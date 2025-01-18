import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  }

  interface Session {
    user: User & {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    firstName: string;
    lastName: string;
    username: string;
  }
}

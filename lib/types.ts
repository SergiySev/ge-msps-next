import 'next-auth';

declare module 'next-auth' {
  interface User {
    firstName: string;
    lastName: string;
  }

  interface Session {
    user: User & {
      email: string;
    };
  }
}

export type IPagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

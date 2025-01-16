import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Credentials:', credentials);
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please enter username and password');
        }

        const user = await prisma.staff.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          throw new Error('No user found with this username');
        }

        //FIXME const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        const passwordMatch = credentials.password === user.password;

        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }

        return {
          id: user.id.toString(),
          username: user.username,
        };
      },
    }),
  ],
  /* secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  }, */
  callbacks: {},
});

export { handler as GET, handler as POST };

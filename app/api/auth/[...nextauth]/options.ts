import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
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
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please enter username and password');
        }

        const user = await prisma.staff.findUnique({
          where: {
            username: credentials.username,
          },
          include: {
            hospital: true,
          },
        });

        if (!user) {
          throw new Error('No user found with this username');
        }

        if (!user.active) {
          throw new Error('Your account is inactive. Please contact administrator');
        }

        // Check password
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }

        // Hospital validation for non-superadmin users
        if (user.role !== 'superadmin') {
          if (!user.hospital_id) {
            throw new Error('No hospital assigned. Please contact administrator');
          }

          if (!user.hospital?.active) {
            throw new Error('Hospital is inactive. Please contact administrator');
          }
        }

        return {
          id: user.id.toString(),
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role || 'nurse',
          hospitalId: user.hospital_id,
          hospitalName: user.hospital?.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.role = user.role;
        token.hospitalId = user.hospitalId;
        token.hospitalName = user.hospitalName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
          username: token.username as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          role: token.role,
          hospitalId: token.hospitalId,
          hospitalName: token.hospitalName,
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      if (url.startsWith('http')) {
        return url;
      }
      return baseUrl;
    },
  },
};

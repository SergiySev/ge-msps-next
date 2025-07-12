import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/options';
import { withCSRFProtection } from 'msps/lib/auth/csrf';

async function logoutHandler(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    // Clear all next-auth related cookies
    const response = NextResponse.json({ success: true });

    response.cookies.delete('next-auth.session-token');
    response.cookies.delete('next-auth.csrf-token');
    response.cookies.delete('next-auth.callback-url');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export const POST = withCSRFProtection(logoutHandler);

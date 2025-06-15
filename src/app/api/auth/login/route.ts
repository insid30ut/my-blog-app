import { NextResponse } from 'next/server';
import User from '../../../../models/User';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    // TODO: Placeholder for finding user by email in database
    // For now, simulate a user lookup
    const simulatedUser: User | undefined = email === 'test@example.com' ? {
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashed_password123', // This should be a truly hashed password from DB
    } : undefined;

    if (!simulatedUser) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // TODO: Placeholder for comparing provided password with stored hashed password
    // const passwordMatch = await bcrypt.compare(password, simulatedUser.password);
    const passwordMatch = password === 'password123'; // Simulate password match

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // TODO: Placeholder for session management/JWT generation
    // For now, return a success message with basic user info
    return NextResponse.json({ message: 'Login successful!', user: { username: simulatedUser.username, email: simulatedUser.email } }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../../lib/dbConnect';
import UserModel from '../../../../../models/UserModel';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    await dbConnect();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // For now, return a success message with basic user info
    return NextResponse.json({ message: 'Login successful!', user: { username: user.username, email: user.email } }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
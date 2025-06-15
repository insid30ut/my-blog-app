import { NextResponse } from 'next/server';
import User from '../../../../models/User';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // Basic validation
    if (!username || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // TODO: Hash password using bcryptjs or similar library
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Placeholder for saving user to database
    // For now, simulate a successful user creation
    const newUser: User = {
      username,
      email,
      password: `hashed_${password}`, // Placeholder for hashed password
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Simulating user registration:', newUser);

    return NextResponse.json({ message: 'User registered successfully!', user: { username: newUser.username, email: newUser.email } }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
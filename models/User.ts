interface User {
  id?: string; // MongoDB _id can be used
  username: string;
  email: string;
  password: string; // Will be hashed
  profilePicture?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default User;
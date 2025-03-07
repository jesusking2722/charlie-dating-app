export interface User {
  _id?: string;
  googleId?: string;
  email: string;
  name?: string;
  password: string;
  profilePic?: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

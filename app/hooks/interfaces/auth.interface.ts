export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  aud?: string;
  role?: string;
  email: string;
  email_confirmed_at?: string;
  last_sign_in_at?: string;
  created_at?: string;
  updated_at?: string;

  app_metadata?: {
    provider?: string;
    providers?: string[];
  };

  user_metadata?: {
    email?: string;
    email_verified?: boolean;
    full_name?: string;
    phone_verified?: boolean;
    sub?: string;
  };
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  message?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  message?: string;
}

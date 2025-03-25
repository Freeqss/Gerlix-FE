export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface SignUpBody {
  email: string;
  password: string;
}

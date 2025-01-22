export interface UserDto {
  id: number;
  username: string;
  email: string;
  nom: string;
  prenom: string;
  structureId?: number;
}

export interface TokenPayload {
  id: number;
  username: string;
  email: string;
  nom: string;
  prenom: string;
  structureId: number;
  roles: string[];
  exp: number;
  iat: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface RegisterResponse extends ApiResponse {
  user: UserDto;
}

export interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  nom: string;
  prenom: string;
  structureId: number;
  roles: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  structureId: number;
}

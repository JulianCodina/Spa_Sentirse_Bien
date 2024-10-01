import axios from './axios';
import IUser from '../types/IUser';


// Interfaz para la respuesta de usuario
interface UserResponse {
  data: {
    user: IUser;
  };
}

// Interfaz para la respuesta de verificar token
interface VerificarTokenResponse {
  data: {
    user: IUser | null;
  };
}

// Funciones con tipos de retorno explícitos
export const registerRequest = (user: IUser): Promise<UserResponse> => 
  axios.post('/register', user);

export const loginRequest = (user: IUser): Promise<UserResponse> => 
  axios.post('/login', user);

export const verificarToken = (): Promise<VerificarTokenResponse> => 
  axios.get('/verify');
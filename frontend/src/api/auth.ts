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
//export const registerRequest = (user: IUser): Promise<UserResponse> => 
//  axios.post('/register', user);

export const loginRequest = (user: IUser): Promise<UserResponse> => 
  axios.post('/login', user);

export const verificarToken = (): Promise<VerificarTokenResponse> => 
  axios.get('/verify');

// Función para registro con manejo de errores
export const registerRequest = async (user: IUser): Promise<UserResponse | null> => {
  try {
    const response = await axios.post<UserResponse>('/register', user);
    return response.data; // Aquí devolvemos solo los datos de la respuesta
  } catch (error: any) {
    console.error('Error en la solicitud de registro:', error.response?.data || error.message);
    return null;
  }
};

import { jwtDecode } from 'jwt-decode';

const useAuth = (session) => {
  try {
   
      const decoded = jwtDecode(session)
      const {sub, username, phone } = decoded
      return {sub,username, phone};
    
  } catch (error) {
    console.error('Error decoding token:', error);
    // Handle the decoding error, return null or a default value
    return null;
  }
};

export default useAuth;

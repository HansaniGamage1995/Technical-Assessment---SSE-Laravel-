// src/services/auth.service.js
import axios from 'axios';

// Configure axios
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;

const register = async (formData) => {
  try {
    const response = await axios.post('/register', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the response data if successful
  } catch (error) {
    // Throw the error to be handled by the caller
    throw error.response?.data || error.message;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post('/login', { email, password });
    return response.data; // Contains the JWT token and user data
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default { register, login };

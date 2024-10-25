import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;

const createOrders = async (data) => {
    try {
      const response = await axios.post(`/orders`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const getOrders = async (isAdmin = false, token, page = 1, page_size = 10) => {
    try {
      const response = await axios.get(`/orders?page=${page}&page_size=${page_size}&isAdmin=${isAdmin}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  export default {
    createOrders, getOrders
  };
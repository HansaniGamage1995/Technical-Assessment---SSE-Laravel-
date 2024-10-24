import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;

const addProduct = async (formData) => {
  try {
    const response = await axios.post('/products', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getProducts = async (page = 1, search, page_size = 10) => {
  try {
    const response = await axios.get(
      `/products?page=${page}&page_size=${page_size}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getProduct = async (id) => {
  try {
    const response = await axios.get(`/products/${id}/edit`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export default {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

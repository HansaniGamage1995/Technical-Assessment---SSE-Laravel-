import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import orderService from '../../services/order.service';
import productService from '../../services/product.service';
import { useNavigate } from 'react-router-dom';
import { cookies } from "../../helpers/cookies.jsx";
import { jwtDecode } from "jwt-decode";

const OrderForm = ({ onClose, orderDetails }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState('pending');
  const [productItems, setProductItems] = useState([]);
  const [products, setProducts] = useState([{ product_id: '', quantity: '', price: 0 }]);
  const navigate = useNavigate();

  // Fetch token on component mount
  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setToken(decodedToken);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        const availableProducts = response.data.filter(
          (item) => item.name && item.price && item.stock_quantity > 0
        );
        setProductItems(availableProducts);
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (index, productId) => {
    const selectedProduct = productItems.find((item) => item.id === parseInt(productId));
    const newProducts = [...products];
    newProducts[index].product_id = productId;
    newProducts[index].price = selectedProduct ? selectedProduct.price : 0;
    setProducts(newProducts);
    updateTotalPrice(newProducts);
  };

  const handleQuantityChange = (index, quantity) => {
    const selectedProduct = productItems.find(
      (item) => item.id === parseInt(products[index].product_id)
    );
    if (selectedProduct && selectedProduct.stock_quantity < quantity) {
      toast.warn(`Stock limit is ${selectedProduct.stock_quantity}`);
    } else {
      const newProducts = [...products];
      newProducts[index].quantity = parseInt(quantity) || 1;
      setProducts(newProducts);
      updateTotalPrice(newProducts);
    }
  };

  const updateTotalPrice = (products) => {
    const total = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleAddProductRow = () => {
    setProducts([...products, { product_id: '', quantity: 1, price: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      status,
      user_id: token.id,
      items: products,
      total_price: totalPrice,
    };

    try {
      await orderService.createOrders(formData);
      toast.success('Order created successfully!');
    } catch (error) {
      const errors = error.response?.data?.errors || {};
      Object.values(errors).forEach((errorArray) =>
        errorArray.forEach((msg) => toast.error(msg))
      );
    } finally {
      window.location.reload();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/4">
        <h2 className="text-xl font-bold mb-4">Create Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Product</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        className="w-full p-2 border rounded"
                        value={product.product_id}
                        onChange={(e) => handleProductChange(index, e.target.value)}
                      >
                        <option value="">Select Product</option>
                        {productItems.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        className="w-full p-2 border rounded"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        required
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={product.price}
                        readOnly
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={handleAddProductRow}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Product
            </button>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Order Total Price</label>
            <input
              type="number"
              name="total_price"
              value={totalPrice}
              readOnly
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <input
              type="text"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderForm;

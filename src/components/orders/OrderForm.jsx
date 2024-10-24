import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

const OrderForm = ({ onClose, orderDetails }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const productItems = orderDetails
    .flatMap((order) => order.order_items)
    .map((item) => ({
      name: item.product?.name,
      price: item.product?.price,
    }))
    .filter((item) => item.name && item.price);

  const handleProductChange = (e) => {
    const productName = e.target.value;
    setSelectedProduct(productName);

    const product = productItems.find((item) => item.name === productName);
    if (product) {
      setProductPrice(product.price);
    } else {
      setProductPrice('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {/* {product ? 'Edit Product' : 'Add Product'} */}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">Order Total Price</label>
            <input
              type="text"
              name="order_total_price"
              // value={formData.name}
              // onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <input
              name="status"
              // value={formData.description}
              // onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Product Name</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedProduct}
              onChange={handleProductChange}
              required
            >
              <option value="">Select your product</option>
              {productItems.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Product Quantity</label>
            <input
              type="number"
              name="product_quantity"
              // value={formData.stock_quantity}
              // onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Product Price</label>
            <input
              type="number"
              name="product_price"
              value={productPrice}
              readOnly
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
              // disabled={isSubmitting}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderForm;

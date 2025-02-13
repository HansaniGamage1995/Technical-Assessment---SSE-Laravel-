import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import orderService from '../../services/order.service';
import OrderForm from '../../components/orders/OrderForm';
import { cookies } from "../../helpers/cookies.jsx";
import { jwtDecode } from "jwt-decode";

const OrderPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const token = cookies.get('token');
  const user = jwtDecode(token);
  const isAdmin = user.type == 'admin' ? true : false;

  const getOrders = async (page) => {
    setLoading(true);
    try {
      const { total, data } = await orderService.getOrders(isAdmin, token, page);
      setTotalPage(Math.ceil(total / 10));
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => (prev -= 1));
    }
  };

  const handleNextPage = () => {
    if (totalPage > currentPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    getOrders(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getOrders();
  }, []);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseOpen = () => {
    setIsFormOpen(false);
  };

  const setPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    console.log(totalPage);

    return pages;
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log('11111111', id, newStatus);
    
    try {
      const response = await orderService.updateOrderStatus(id, newStatus);
      console.log('2222222222', response);
      
      toast.success(response.data.message || 'Order status updated successfully!');
      getOrders(currentPage); // Refresh orders to reflect the change.
    } catch (error) {
      const errors = error.response?.data?.errors || {};
      Object.values(errors).forEach((errorArray) =>
        errorArray.forEach((msg) => toast.error(msg))
      );
    }
  };

  return (
    <Layout open={open} toggleSidebar={() => setOpen(!open)}>
      <section className="bg-white py-[70px] dark:bg-dark">
        <div className="mx-auto px-4 sm:container">
          <div className="border-l-[5px] border-primary border-blue-500 pl-5">
            <h2 className="mb-2 text-2xl font-semibold text-dark dark:text-black">
              Order Management
            </h2>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <button
              onClick={handleOpenForm}
              className="bg-green-700 m-4 border rounded-full py-3 px-7 text-white"
            >
              Add Order
            </button>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-4/5 m-4 text-sm text-center text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Order Total Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Product Qty</th>
                  <th className="px-6 py-3">Product Price</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5">Loading...</td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="5">No Orders found</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr className="bg-white border-b">
                        <td
                          className="px-6 py-4"
                          rowSpan={order.order_items.length + 1}
                        >
                          {order.user.name}
                        </td>
                        <td
                          className="px-6 py-4"
                          rowSpan={order.order_items.length + 1}
                        >
                          {order.user.email}
                        </td>
                        <td
                          className="px-6 py-4"
                          rowSpan={order.order_items.length + 1}
                        >
                          ${order.total_price}
                        </td>
                        <td
                          className="px-6 py-4"
                          rowSpan={order.order_items.length + 1}
                        >
                          {isAdmin ? (
                            <input
                              type="text"
                              defaultValue={order.status}
                              onBlur={(e) => handleStatusChange(order.id, e.target.value)}
                              className="border p-1"
                            />
                          ) : (
                            order.status
                          )}
                        </td>
                      </tr>
                      {order.order_items.map((item) => (
                        <tr key={item.id} className="bg-gray-50 border-b">
                          <td className="px-6 py-4">
                            {item.product?.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4">{item.quantity}</td>
                          <td className="px-6 py-4">${item.price}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between">
            <button onClick={handlePrevPage}>Prev</button>
            <div className="flex space-x-2">
              {setPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 ${currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </div>
        {/* <ToastContainer /> */}
        {isFormOpen && (
          <OrderForm onClose={handleCloseOpen} orderDetails={orders} />
        )}
      </section>
    </Layout>
  );
};

export default OrderPage;

import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import userService from '../../services/user.service';
import OrderForm from './OrderForm';

const OrderPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  console.log('1111111111111', orders);

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await userService.getOrders();
      setOrders(res);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseOpen = () => {
    setIsFormOpen(false);
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

            <form className="flex">
              <input
                type="text"
                placeholder="Search"
                // value={searchQuery}
                // onChange={handleSearchChange}
                className="border px-4 py-2 rounded-l"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r"
              >
                Search
              </button>
            </form>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-4/5 m-4 text-sm text-center text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Id</th>
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
                    <td colSpan="5">No products found</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr className="bg-white border-b">
                        <td
                          className="px-6 py-4"
                          rowSpan={order.order_items.length + 1}
                        >
                          {order.id}
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
                          {order.status}
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
          {/* <div className="flex justify-between">
            <button onClick={handlePrevPage}>Prev</button>
            <div className="flex space-x-2">
              {setPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button onClick={handleNextPage}>Next</button>
          </div> */}
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

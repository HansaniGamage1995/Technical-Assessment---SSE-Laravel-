import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import ProductForm from './ProductForm';
import productService from '../../services/product.service';
import { ToastContainer, toast } from 'react-toastify';

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const getProducts = async (page, search) => {
    try {
      setLoading(true);

      const { total, data } = await productService.getProducts(page, search);

      setTotalPage(Math.ceil(total / 10));
      setProducts(data);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    getProducts(1, searchQuery); // Fetch products with search query
  };

  useEffect(() => {
    getProducts(currentPage, searchQuery);
  }, [currentPage]);

  const handleOpenForm = () => {
    setSelectedProduct(null); // Clear product data for new product
    setIsFormOpen(true);
  };

  const handleEditProduct = (productId, product) => {
    setSelectedProduct(product); // Set the selected product
    setIsFormOpen(true); // Open the form
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId); // Fetch the product
      // setIsFormOpen(true); // Open form after setting product data
      getProducts(currentPage, searchQuery);
      toast.success('Product removed successfully.');
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(null); // Clear selected product
  };

  const handleProductCreatedOrUpdated = () => {
    getProducts(currentPage, searchQuery); // Refresh the product list
    handleCloseForm(); // Close the form
  };

  const setPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Layout open={open} toggleSidebar={() => setOpen(!open)}>
      <section className="bg-white py-[70px] dark:bg-dark">
        <div className="mx-auto px-4 sm:container">
          <div className="border-l-[5px] border-primary border-blue-500 pl-5">
            <h2 className="mb-2 text-2xl font-semibold text-dark dark:text-black">
              Product Management
            </h2>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <button
              onClick={handleOpenForm}
              className="bg-green-700 m-4 border rounded-full py-3 px-7 text-white"
            >
              Add Product
            </button>

            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
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
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5">Loading...</td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="5">No products found</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="bg-white border-b">
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">{product.description}</td>
                      <td className="px-6 py-4">${product.price}</td>
                      <td className="px-6 py-4">{product.stock_quantity}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEditProduct(product.id, product)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 ml-4 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
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
          </div>
        </div>
        <ToastContainer />
        {isFormOpen && (
          <ProductForm
            product={selectedProduct}
            onClose={handleCloseForm}
            onProductCreatedOrUpdated={handleProductCreatedOrUpdated}
          />
        )}
      </section>
    </Layout>
  );
};

export default ProductPage;

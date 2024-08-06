import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Cart = () => {
  const url = process.env.REACT_APP_BASEURL;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getDataCart = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        const tokenMember = localStorage.getItem('TokenMember');
        const memberToken = JSON.parse(tokenMember);
        const token = memberToken.access_token;

        const response = await axios.get(`${url}/carts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const userCarts = response.data.data.filter(item => item.member_id === memberId);

        // Mengelompokkan produk berdasarkan ID produk dan menghitung quantity
        const groupedProducts = userCarts.reduce((acc, product) => {
          const existingProduct = acc.find(p => p.produk_id === product.produk_id);
          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            acc.push({ ...product, quantity: 1 });
          }
          return acc;
        }, []);

        setProducts(groupedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    getDataCart();
  }, [url]);

  const handleRemoveFromCart = async (productId) => {
    try {
      const tokenMember = localStorage.getItem('TokenMember');
      const memberToken = JSON.parse(tokenMember);
      const token = memberToken.access_token;

      // Remove item from cart API
      await axios.delete(`${url}/carts/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update local state
      setProducts(prevProducts => {
        const productToUpdate = prevProducts.find(product => product.produk_id === productId);
        if (productToUpdate) {
          if (productToUpdate.quantity > 1) {
            // Decrease the quantity if more than one
            return prevProducts.map(product =>
              product.produk_id === productId
                ? { ...product, quantity: product.quantity - 1 }
                : product
            );
          } else {
            // Remove the product if quantity is one
            return prevProducts.filter(product => product.produk_id !== productId);
          }
        }
        return prevProducts; // Return unchanged state if product not found
      });

      toast.success('Deleted Successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete item');
    }
  };

  return (
    <div className='cart'>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="bg-slate-900 py-8 antialiased dark:bg-gray-900 md:py-20">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-bold text-white dark:text-white sm:text-2xl">Shopping Cart</h2>

          {products.length === 0 ? (
            <p className="text-white dark:text-white h-screen">Your cart is empty.</p>
          ) : (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="summary mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl max-h-screen overflow-auto">
                {products.map((item) => (
                  <div key={item.produk_id} className="space-y-6">
                    <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20 dark:hidden"
                            src={item.gambar ? item.gambar : "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"}
                            alt={item.nama_barang}
                          />
                          <img
                            className="hidden h-20 w-20 dark:block"
                            src={item.gambar ? item.gambar : "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"}
                            alt={item.nama_barang}
                          />
                        </a>
                        <label htmlFor="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <input
                              type="text"
                              id="counter-input"
                              data-input-counter
                              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-white focus:outline-none focus:ring-0 dark:text-white"
                              placeholder=""
                              value={item.quantity}
                              readOnly
                            />
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-white dark:text-white">${item.harga}</p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-medium text-white hover:underline dark:text-white"
                          >
                            {item.nama_barang}
                          </a>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleRemoveFromCart(item.produk_id)} 
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-white dark:text-white">Order summary</p>

                  <div className="space-y-4">
                    {products.map((item) => (
                      <div className="space-y-2" key={item.produk_id}>
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Price
                          </dt>
                          <dd className="text-base font-medium text-white dark:text-white">
                            ${item.harga}
                          </dd>
                        </dl>
                      </div>
                    ))}

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-white dark:text-white">Total</dt>
                      <dd className="text-base font-bold text-white dark:text-white">
                        ${products.reduce((total, item) => total + parseFloat(item.harga) * item.quantity, 0)}
                      </dd>
                    </dl>
                  </div>
                  <button className="flex w-full items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Checkout
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AllProduct = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const url = process.env.REACT_APP_BASEURL;

  const getDataProduks = async () => {
    try {
      const response = await axios.get(`${url}/produks`);
      setDataProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataProduks();
  }, []);

  const categoryMap = {
    1: 'Baju',
    2: 'Celana',
    3: 'Sepatu',
  };

  const handleDelete = async (id) => {
    try {
      const tokenAdmin = localStorage.getItem("TokenAdmin");
      const adminToken = JSON.parse(tokenAdmin);
      const token = adminToken.access_token;

      // console.log(token);

      await axios.delete(`${url}/produks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Berhasil Dihapus!')

      // Refresh data setelah delete
      getDataProduks();
    } catch (error) {
      console.log(error);
    }
  };

  const deskripsiLimit = (description, limit = 100) => {
    if (description.length > limit) {
      return description.substring(0, limit) + '...';
    }
    return description;
  };

  return (
    <div>
       <Toaster position="top-center" reverseOrder={false} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">Product name</th>
              <th scope="col" className="px-6 py-3">Color</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Desc</th>
              <th scope="col" className="px-6 py-3">Available</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Discount</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataProduct.map((product) => (
              <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id={`checkbox-${product.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor={`checkbox-${product.id}`} className="sr-only">checkbox</label>
                  </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.nama_barang}
                </th>
                <td className="px-6 py-4">{product.warna}</td>
                <td className="px-6 py-4">{categoryMap[product.category_id] || 'Unknown'}</td>
                <td className="px-6 py-4"> {deskripsiLimit(product.deskripsi, 18)}</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">Rp. {product.harga}</td>
                <td className="px-6 py-4">{product.diskon}%</td>
                <td className="flex items-center px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  <button onClick={() => handleDelete(product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProduct;

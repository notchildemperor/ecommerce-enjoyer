import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AllCategories = () => {
    const [category, setCategory] = useState([]);
    const url = process.env.REACT_APP_BASEURL;

    const getDataCategory = async () => {
        try{
            const response = await axios.get(`${url}/categories`);
            setCategory(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataCategory();
    }, [])
    
  return (
    <div>
                

<div classNameName="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Category name
                </th>
                <th scope="col" className="px-6 py-3">
                    Category Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Category Desc
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {category.map((category) => (

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {category.nama_kategori}
                </th>
                <td className="px-6 py-4">
                    {category.id}
                </td>
                <td className="px-6 py-4">
                    {category.deskripsi}
                </td>
                <td className="px-6 py-4">
                    {category.created_at}
                </td>
                <td className="px-6 py-4">
                  <button className="font-medium text-red-600 dark:text-red-500 hover:underline ms-1">Remove</button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
</div>

    </div>
  )
}

export default AllCategories
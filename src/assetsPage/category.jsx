import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const url = process.env.REACT_APP_BASEURL;
  const imgUrl = process.env.REACT_APP_BASEIMG;
  const [categoryData, setCategoryData] = useState([]);

  const getDataCategory = async () => {
    try {
      const response = await axios.get(`${url}/categories`);
      setCategoryData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataCategory();
  }, []);

  return (
    <div className="flex justify-center flex-wrap">
      {categoryData &&
        categoryData.map((category) => {
          if ([12, 13, 14].includes(category.id)) {
            return (
              <div key={category.id} className="m-4 max-w-sm flex flex-col justify-between">
                <div className="bg-white rounded-lg flex flex-col 
                transform transition-transform hover:scale-105">
                  <a href={`/${category.nama_kategori.toLowerCase()}`}>
                    <img
                      className="rounded-t-lg w-full h-48 object-cover"
                      src={`${imgUrl}/${category.gambar}`}
                      alt={category.nama_kategori}
                    />
                  </a>
                  <div className="p-5 flex-grow">
                    <a href={`/${category.nama_kategori.toLowerCase()}`}>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {category.nama_kategori}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {category.deskripsi}
                    </p>
                  </div>
                  <div className="p-5">
                    <a
                      href={`/${category.nama_kategori.toLowerCase()}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

export default Category;

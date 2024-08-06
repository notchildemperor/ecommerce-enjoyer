import axios from "axios";
import React, { useEffect, useState } from "react";

const Popular = () => {
  const url = process.env.REACT_APP_BASEURL;
  const imgUrl = process.env.REACT_APP_BASEIMG;
  const [popularData, setPopularData] = useState([]);

  const getDataPopular = async () => {
    try {
      const response = await axios.get(`${url}/produks`);
      setPopularData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataPopular();
  }, []);

  return (
    <div className="container mx-auto px-4 mt-40">
      <h1 className="text-white text-center text-3xl font-bold mb-10 mt-10">
        POPULAR IN HERE
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {popularData &&
          popularData.map((produk, index) => (
            <div
              key={index}
              className="border border-white px-4 py-6 bg-white rounded-lg shadow-lg"
            >
              <img className="w-full h-48 object-cover" src={`${imgUrl}/${produk.gambar}`}/>
              <div className="py-6 px-1">
                <div className="font-bold text-xl mb-2 flex justify-between">
                  {produk.nama_barang}
                  <button class="text-xs bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
                   hover:text-white py-1 px-3 border border-blue-700 hover:border-transparent rounded">
                    ADD</button>
                </div>
                <p className="text-gray-700 text-base mb-2">
                  {produk.deskripsi}
                </p>
              </div>
              <div>
                <div class="flex px-1">
                  <svg
                    class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p class="ms-2 text-sm font-bold text-black">4.95</p>
                </div>
              </div>
              <div className="px-1 pt-4 pb-2">
                {produk.tags &&
                  produk.tags.split(",").map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-gray-300 rounded-sm px-3 py-1 text-sm font-semibold text-black mr-2 mb-2"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Popular;

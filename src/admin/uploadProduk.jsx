import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { FaPlus } from "react-icons/fa6";

const UploadProduk = () => {
    const [file, setFile] = useState(null);
    const url = process.env.REACT_APP_BASEURL;
    const [productData, setProductData] = useState({
        category_id: '',
        subkategori_id: '',
        nama_barang: '',
        gambar: null,
        deskripsi: '',
        harga: '',
        diskon: '',
        bahan: '',
        tags: '',
        sku: '',
        ukuran: '',
        warna: ''
    })

    const idCategories = [
        { value: '1', label: 'Baju' },
        { value: '2', label: 'Celana' },
        { value: '3', label: 'Sepatu' }
    ];

    const handleInput = (e) => {
        const { name, value } = e.target;
        if ((name === 'harga' || name === 'diskon') && value.length > 6){
            return;
        }
        setProductData({ ...productData, [name]:value});
    }

    const handleImage = (e) => {
        setProductData({ ...productData, gambar: e.target.files[0] });
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('TokenAdmin');
        const tokenObject = JSON.parse(accessToken);
        const token = tokenObject.access_token;

        const { gambar, harga, nama_barang, deskripsi, sku, category_id, subkategori_id } = productData;
        if (!gambar || !harga || !nama_barang || !deskripsi || !sku || !category_id || !subkategori_id){
            toast.error('Mohon isi semua input');
            return;
        }
        const formData = new FormData();
        formData.append('gambar', productData.gambar);
        formData.append('harga', productData.harga);
        formData.append('diskon', productData.diskon);
        formData.append('nama_barang', productData.nama_barang);
        formData.append('deskripsi', productData.deskripsi);
        formData.append('bahan', productData.bahan);
        formData.append('tags', productData.tags);
        formData.append('sku', productData.sku);
        formData.append('ukuran', productData.ukuran);
        formData.append('warna', productData.warna);
        formData.append('category_id', productData.category_id);
        formData.append('subkategori_id', productData.subkategori_id);

        try {
            const response = await axios.post(`${url}/produks`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            toast.success('Produk berhasil di upload!')
            setTimeout(() => {
                window.location.href = '/admin'
            }, 500);

            setProductData({
                category_id: '',
                subkategori_id: '',
                nama_barang: '',
                gambar: null,
                deskripsi: '',
                harga: '',
                diskon: '',
                bahan: '',
                tags: '',
                sku: '',
                ukuran: '',
                warna: ''
            })
            setFile(null)
        } catch (error){
            console.log(error);
            toast.error('Gagal Upload!');
        }
    }
  return (
    <div>
         <Toaster position="top-center" reverseOrder={false} />
<button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="flex mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
 <FaPlus className='text-xl'/> Add Items
</button>

<div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-2 w-full max-w-3xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Product
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <form onSubmit={handleSubmit}>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
        <label for="gambar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
        <div className='flex'>
        <input type='file' accept='image/png, image/jpeg, image/jpg' name='gambar' onChange={handleImage}/>
            {file && <img src={file} alt='Uploaded' className="bg-gray-50 border border-gray-300 w-16 h-auto" placeholder="Doe" required  />}
        </div>
        </div>
        <div>
            <label for="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select name='category_id' value={productData.category_id} onChange={handleInput} className='rounded-lg'>
                  <option value=''>Pilih Kategori</option>
                  {idCategories.map((idCategory) => (
                    <option key={idCategory.value} value={idCategory.value}>{idCategory.label}</option>
                  ))}
                </select>
        </div>
        <div>
            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub-Category</label>
            <select name='subkategori_id' value={productData.subkategori_id} onChange={handleInput} className='rounded-lg'>
                  <option value=''>Pilih Subkategori</option>
                  {idCategories.map((idCategory) => (
                    <option key={idCategory.value} value={idCategory.value}>{idCategory.label}</option>
                  ))}
                </select>
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Title</label>
            <input type="text" name='nama_barang' value={productData.nama_barang} onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e. g : Good Tshirt..." required />
        </div>  
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Description</label>
            <input type="text" name='deskripsi' value={productData.deskripsi} onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g : Very Good..." required />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Tags</label>
            <input type="text" name='tags' value={productData.tags} onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g : tshirt, good, lowprice" required />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Material</label>
            <input type="text" name='bahan' value={productData.bahan} onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g : Nylon" required />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
            <input type="text" name='warna' value={productData.warna} onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g : White" required />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
            <input type="text" name='sku' value={productData.sku} onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g : aed6GjU" required />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
            <input type="text" name='ukuran' value={productData.ukuran} onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g : 35, XL" required />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="number" name='harga' value={productData.harga} onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g : 250000" min={0} maxLength={7} required />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
            <input type="number" name='diskon' value={productData.diskon} onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g : 20" min={0} required />
        </div>
    </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
        </div>
    </div>
</div> 

    </div>
  )
}

export default UploadProduk
import React, { useState } from 'react'
import { GoPersonFill } from "react-icons/go";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
    const url = process.env.REACT_APP_BASEURL;
    const [formData, setFormData] = useState({
        nama_member: '',
        no_hp: '',
        email: '',
        password: '',
        konfirmasi_password: '',
    });

    const proceedRegister = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    } 

    const validatePassword = () => {
        if (formData.password !== formData.konfirmasi_password) {
          toast.error('Konfirmasi password tidak sesuai');
          return false;
        }
        return true;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword()){
            return;
        }

        try{
            const response = await axios.post(`${url}/auth/register`, formData);

            if (response.status === 200){
                toast.success('Registrasi Berhasil!');
                window.location.href = '/login'
            } else {
                toast.error('Registrasi Gagal, Coba Lagi!');
            }
        } catch (error){
            console.log(error);
        }
    }
  return (
    <div>
        <section className="bg-gray-50 dark:bg-gray-900">
        <Toaster position="top-center" reverseOrder={false} />
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <GoPersonFill/>
          TOKOPAKEDI    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label for="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                      <input type="text" name="nama_member" id="nama" value={formData.nama_member} onChange={proceedRegister} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="puri puri prisoner" required=""/>
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" value={formData.email} onChange={proceedRegister} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required=""/>
                  </div>
                  <div>
                      <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your number</label>
                      <input type="number" name="no_hp" id="phone" value={formData.no_hp} onChange={proceedRegister} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="088555555" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" value={formData.password} onChange={proceedRegister} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" name="konfirmasi_password" id="confirmPassword" value={formData.konfirmasi_password} onChange={proceedRegister} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Register
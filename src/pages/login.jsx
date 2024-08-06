import axios from 'axios';
import React, { useState } from 'react';
import { GoPersonFill } from "react-icons/go";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const url = process.env.REACT_APP_BASEURL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await axios.post(`${url}/login`, { email, password });
            if (loginResponse.status === 200) {
                const tokenLogin = loginResponse.data;
                const tokenMember = JSON.stringify(tokenLogin);
                localStorage.setItem('TokenMember', tokenMember);

                const getMembers = async (page = 1) => {
                    const response = await axios.get(`${url}/members?page=${page}`, {
                        headers: {
                            Authorization: `Bearer ${tokenLogin.access_token}`
                        }
                    })
                    return response.data;
                }

                let memberId = null;
                let memberName = null;
                let page = 1;
                let membersData;
                do {
                    membersData = await getMembers(page);
                    const member = membersData.data.find(member => member.email === email);
                    if (member) {
                        memberId = member.id;
                        memberName = member.nama_member;
                        break;
                    }
                    page++;
                } while (membersData.data.length > 0);

                if (memberId) {
                    localStorage.setItem("memberId", memberId);
                    localStorage.setItem("userEmail", email);
                    localStorage.setItem("memberName", memberName);
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 1000);
                } else {
                    toast.error("Failed to login");
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Failed to login");
        }
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <Toaster position="top-center" reverseOrder={false} />
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <GoPersonFill />
                        TOKOPAKEDI
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@gmail.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <BiSolidHide className='bisolid' /> : <BiSolidShow className='bisolid' />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;

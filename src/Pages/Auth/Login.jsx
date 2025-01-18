import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Login = () => {
    const { loginError, setLoginError, logIn } = useAuth()
    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
        setLoginError('')

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        logIn(formValues)


    }








    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-white">Login to your account</h2>
                <form className="mt-4" onSubmit={handleSubmit}>
                    {loginError && <p className='text-red-600 my-1'>{loginError}</p>}
                    <div className="mb-4">
                        <label className="block text-white">user name</label>
                        <input
                            type="text"
                            name='username'
                            value={formValues.username}
                            placeholder=' your username'
                            className="w-full px-4 py-2 mt-2 border rounded-lg text-white bg-inherit focus:outline-none  focus:border-pink-600"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Password</label>
                        <input
                            type="password"
                            name='password'
                            value={formValues.password}
                            placeholder=' your password'
                            className="w-full px-4 py-2 mt-2 border rounded-lg text-white bg-inherit focus:outline-none  focus:border-pink-600"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-pink-600 rounded-lg hover:bg-pink-500"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-white text-center">
                    Don't have an account?
                    <a href="/movieapp/signup" className="text-pink-500 hover:underline mx-4">
                        signup
                    </a>
                </p>

            </div>
        </div>
    );
};

export default Login;

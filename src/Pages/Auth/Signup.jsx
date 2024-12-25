import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',

    })

    const [errors, setErrors] = useState({})



    const handlechange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const validate = () => {
        let validationErrors = {}
        if (!formValues.username) {
            validationErrors.username = 'username cannot be empty'
        } else if (formValues.username.length < 3) {
            validationErrors.username = 'Username must be more than 3 characters.'
        }


        if (!formValues.email) {
            validationErrors.email = 'email cannot be empty'
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(formValues.email)) {
            validationErrors.email = 'email is not valid'
        }
        if (!formValues.password) {
            validationErrors.password = 'passwrod cannot be empty'
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]{6,}$/.test(formValues.password)) {
            validationErrors.password = 'Password must contain letters and numbers.'
        }
        if (formValues.password !== formValues.confirmPassword) {
            validationErrors.confirmPassword = 'The passwords are not the same.'
        }
        return validationErrors;




    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            console.log(validationErrors)
        } else {
            console.log('success submitting', formValues)
            setErrors({})
            navigate('/movieapp')
        }

    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white">UserName</label>
                        <input
                            type="text"
                            placeholder='add your username'
                            name='username'
                            value={formValues.username}

                            className="w-full px-4 py-2 mt-2 border bg-inherit text-white rounded-lg focus:outline-none  focus:border-pink-600"
                            onChange={handlechange}
                        />
                        {errors.username && <p className='text-red-600 my-1'>{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Email</label>
                        <input
                            type="email"
                            placeholder='add your Email'
                            name='email'
                            value={formValues.email}
                            onChange={handlechange}
                            className="w-full px-4 py-2 mt-2 border bg-inherit text-white rounded-lg focus:outline-none  focus:border-pink-600"

                        />
                        {errors.email && <p className='text-red-600 my-1'>{errors.email}</p>}

                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Password</label>
                        <input
                            type="password"
                            placeholder='add your Password'
                            name='password'
                            value={formValues.password}
                            className="w-full px-4 py-2 mt-2 border bg-inherit text-white rounded-lg focus:outline-none  focus:border-pink-600"
                            onChange={handlechange}
                        />
                        {errors.password && <p className='text-red-600 my-1'>{errors.password}</p>}

                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Confirm Password</label>
                        <input
                            type="password"
                            placeholder='repeat your password'
                            name='confirmPassword'
                            value={formValues.confirmPassword}
                            className="w-full px-4 py-2 mt-2 border bg-inherit text-white rounded-lg focus:outline-none  focus:border-pink-600"
                            onChange={handlechange}
                        />
                        {errors.confirmPassword && <p className='text-red-600 my-1'>{errors.confirmPassword}</p>}

                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-pink-600 rounded-lg hover:bg-pink-500"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-sm text-white text-center">
                    Already have an account?
                    <a href="/movieapp/login" className="text-pink-500 mx-4 hover:underline">
                        login now
                    </a>
                </p>

            </div>

        </div>
    );
};

export default Signup;
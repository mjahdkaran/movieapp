import axios from 'axios'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()
const API_Base_URL_AMIR='http://65.109.177.24:2024/api/'
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token')||null)
    const [loginError, setLoginError] = useState()
    const [signUpError, setSignUpError] = useState()
    const[userData,setUserData]=useState({})
    const navigate = useNavigate()


    useEffect(() => {
        let token = localStorage.getItem('token')


        if (token) {
            setToken(token)
            setUser(localStorage.getItem('userName'))

        }
    }, [])
    useEffect(()=>{
        if (!token) return;
        const getCurrentUser=async(token)=>{
            try {
                const response=await axios.get(`${API_Base_URL_AMIR}user`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                return setUserData (response.data);
            } catch (error) {
                console.error('Error getting user',error)
                throw error
            }
            }
         getCurrentUser(token)


    },[token])
    
        

    // SignUp
    const signUp = async (formValues) => {
        try {
            const response = await fetch('http://65.109.177.24:2024/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'userName': formValues.username,
                    'password': formValues.password,
                    'email': formValues.email
                })
            });
            console.log('response' + response)
            if (!response.ok) {
                const errorData = await response.json()
                console.log('errorData', errorData)
                setSignUpError(errorData.errorMessage)

                throw new Error(errorData.errorMessage || 'registration failed')
            }
            const data = await response.json()
            if (data) {
                window.localStorage.setItem('token', data)
                window.localStorage.setItem('userName', formValues.username);
                setUser(formValues.username)
                setSignUpError('')
            }
            setUser(formValues.username)
            navigate('/')

        } catch (error) {
            setSignUpError(error.message || 'Something went wrong during registration')
        }
    }


    const logIn = async (formValues) => {
        try {
            const response = await fetch('http://65.109.177.24:2024/api/user/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'userName': formValues.username,
                    'password': formValues.password
                })


            })
            if (!response.ok) {
                const errorData = await response.json()
                setLoginError(errorData.errorMessage)
                throw new Error(errorData.errorMessage)

            }
            const data = await response.json()
            if (data) {
                window.localStorage.setItem('token', data)
                window.localStorage.setItem('userName', formValues.username);
                setUser(formValues.username)
                navigate('/')

            }
        } catch (error) {
            setLoginError(error.message || 'login failed')

        }

    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('userName')
        localStorage.removeItem('token');
    }

    const getToken = () => {
        let token = localStorage.getItem('token')

        return token
    }
    return (



        <AuthContext.Provider value={{ user, setLoginError, loginError, logIn, signUp, signUpError, logout, getToken, token ,userData}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);


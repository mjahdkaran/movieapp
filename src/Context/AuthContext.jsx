import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Signup from '../Pages/Auth/Signup'
const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loginError, setLoginError] = useState()
    const [signUpError, setSignUpError] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        let saveUser = localStorage.getItem('saveUser')
        if (saveUser) {
            setUser(saveUser)
        }
    }, [])

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
            console.log('response'+response)
            if (!response.ok) {
                const errorData = await response.json()
                console.log('errorData',errorData)
                setSignUpError(errorData.errorMessage)
               
                throw new Error(errorData.errorMessage || 'registration failed')
            }
            const data = await response.json()
            if (data) {
                window.localStorage.setItem('token', data)
                setUser(formValues.username)
                setSignUpError('')
            }
            setUser(formValues.username)
            navigate('/movieapp')

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
                setUser(formValues.username)
                navigate('/movieapp')

            }
        } catch (error) {
            setLoginError(error.message|| 'login failed')

        }

    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('username')
    }

    const getToken=() => {
        let token=localStorage.getItem('token')
        return token
    }
    return (



        <AuthContext.Provider value={{ user, setLoginError, loginError, logIn, signUp ,signUpError,logout,getToken}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);


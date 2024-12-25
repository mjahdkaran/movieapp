import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState()
    const navigate = useNavigate()

    const correctValues = { username: 'user', password: 'user123' }


    useEffect(() => {
        let saveUser = localStorage.getItem('saveUser')
        if (saveUser) {
            setUser(saveUser)
        }
    }, [])

    const login = (username, password) => {
        if (username === correctValues.username && password === correctValues.password) {
            setUser(username)
            localStorage.setItem('username', username)
            setError('')
            navigate('/movieapp')

        }
        else {
            setError('Username or password is incorrect');
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('username')
    }
    return (



        <AuthContext.Provider value={{ user, error, setError, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);


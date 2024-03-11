
import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvaider'

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth

import axios from 'axios';
import {useState , useEffect , createContext, Children} from 'react'

const  AuthContext = createContext();

const AuthProvaider = ({children}) => {

    const [auth , setAuth] = useState({});
    const [cargando , setCargando] = useState(true);


    useEffect(()=> {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if(!token){
                setCargando(false)
                return;
            }

            const config = {
                headers : {
                    "Content-Type" : "aplication/json" , 
                    Authorization : `Bearer ${token}`
                }
            }

            try {
                const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil` ,
                config)
                setAuth(data)
            } catch (error) {
                console.log(error)
            }

            setCargando(false);
        }

        return () => {autenticarUsuario()}
    } , [])


    const cerrarSesionAuth = ()=> {
        setAuth({})
    }

  return (
    <AuthContext.Provider 
    value={{
        auth ,
        cargando ,
        setAuth , 
        cerrarSesionAuth
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export{
    AuthProvaider
}

export default AuthContext

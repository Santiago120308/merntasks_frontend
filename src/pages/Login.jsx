import React , {useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [alerta , setAlerta] = useState({});
    const {setAuth} = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([email , password].includes('')){
            setAlerta({
                msg : "Todos los campos son obligatorios" ,
                error : true
            })
            return;
        }

        setAlerta({})

        //validamos al usuario 
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login` ,
            {email , password}) 

            console.log(data)
            localStorage.setItem('token' , data.token)
            localStorage.setItem('id' , data._id)
            setAuth(data)
            navigate("/proyectos")
        } catch (error) {
            setAlerta({
                msg : error.response.data.msg ,
                error : true
            })
        }
    }

    const {msg} = alerta;

  return (
    <div>
        <h1 className='text-sky-600 font-black text-6xl capitalize'>Inicia sesion y administra tus {''}
         <span className='text-slate-700'>Proyectos</span></h1>

         {msg && <Alerta alerta={alerta}/>}

         <form action="" className='bg-white p-10 my-10' 
         onSubmit={handleSubmit}>
            <div className='my-5'>
                <label htmlFor="email" 
                className='block mb-2 font-bold'>EMAIL</label>
                <input 
                type="email" 
                id='email'
                placeholder='Email de registro'
                className='bg-gray-50 w-full rounded-lg p-3 text-black'
                onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div className='my-5'>
                <label htmlFor="password" 
                className='block mb-2 font-bold'>PASSWORD</label>
                <input 
                type="password" 
                id='password'
                placeholder='Escribe tu password'
                className='bg-gray-50 w-full rounded-lg p-3 text-black'
                onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <input type="submit" 
            className='w-full bg-sky-700 p-2 text-white font-bold hover:cursor-pointer mb-4' 
            value='INICIAR SESION'/>
         </form>

         <nav className='lg:flex lg:justify-between'>
            <Link className='text-center block my-5 text-slate-500 uppercase text-sm'
            to={"registrar"}>
                ¿No tienes cuenta? <span className='font-bold'>Registrate</span>
            </Link>

            <Link className='text-center block my-5 text-slate-500 uppercase text-sm font-bold'
            to={"olvide-password"}>
                Olvide mi password
            </Link>
         </nav>
    </div>
  )
}

export default Login

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import axios from 'axios';

const Registrar = () => {

    const [nombre , setNombre] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [repetirPassword , setRepetirPassword] = useState("");
    const [alerta , setAlerta] = useState({});
    const {msg} = alerta;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([nombre , email , password , repetirPassword].includes('')){
            setAlerta({
                msg : "Todos los campos son obligatorios" ,
                error : true ,
            })

            return;
        }

        if(password !== repetirPassword){
            setAlerta({
                msg : "Los password no coinciden" ,
                error : true ,
            })

            return;
        }

        if(password.length < 6){
            setAlerta({
                msg : "El password debe de ser minimo de 6 caracteres" ,
                error : true ,
            })

            return;
        }

        //Enviando el usuario a la api
        setAlerta({})

        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, 
            {nombre , email , password})

            setAlerta({
                msg : data.msg ,
                error : false
            })
        } catch (error) {
            setAlerta({
                msg : error.response.data.msg ,
                error : true
            })
        }
    }

    

  return (
    <div>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Crea una cuenta y administra tus {''}
     <span className='text-slate-700'>Proyectos</span></h1>

     {msg && <Alerta alerta={alerta}/>}

     <form action="" className='bg-white p-10 my-10' 
     onSubmit={handleSubmit}>

        <div className='my-5'>
            <label htmlFor="nombre" 
            className='block mb-2 font-bold'>NOMBRE</label>
            <input 
            type="text" 
            id='nombre'
            placeholder='Tu Nombre'
            className='bg-gray-50 w-full rounded-lg p-3 text-black'
            value={nombre}
            onChange={e => setNombre(e.target.value)}/>
        </div>

        <div className='my-5'>
            <label htmlFor="email" 
            className='block mb-2 font-bold'>EMAIL</label>
            <input 
            type="email" 
            id='email'
            placeholder='Email de registro'
            className='bg-gray-50 w-full rounded-lg p-3 text-black'
            value={email}
            onChange={e => setEmail(e.target.value)}/>
        </div>

        <div className='my-5'>
            <label htmlFor="password" 
            className='block mb-2 font-bold'>PASSWORD</label>
            <input 
            type="password" 
            id='password'
            placeholder='Escribe tu password'
            className='bg-gray-50 w-full rounded-lg p-3 text-black'
            value={password}
            onChange={e => setPassword(e.target.value)}/>
        </div>

        <div className='my-5'>
            <label htmlFor="password2" 
            className='block mb-2 font-bold'>REPETIR PASSWORD</label>
            <input 
            type="password" 
            id='password2'
            placeholder='Repite tu password'
            className='bg-gray-50 w-full rounded-lg p-3 text-black'
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}/>
        </div>

        <input type="submit" 
        className='w-full bg-sky-700 p-2 text-white font-bold hover:cursor-pointer mb-4' 
        value='CREAR CUENTA'/>
     </form>

     <nav className='lg:flex lg:justify-between'>
        <Link className='text-center block my-5 text-slate-500 uppercase text-sm'
        to={"/"}>
            ¿Ya tienes una cuenta? <span className='font-bold'>Inicia Sesion</span> 
        </Link>

       
     </nav>
</div>
  )
}

export default Registrar

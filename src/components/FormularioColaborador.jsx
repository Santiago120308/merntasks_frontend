import React, { useState } from 'react'
import Alerta from './Alerta';
import useProyectos from '../hooks/useProyectos';

const FormularioColaborador = () => {

    const [email , setEmail] = useState('');
    const [alerta , setAlerta] = useState({});
    const {submitColaborador , setCargando , setColaborador} = useProyectos();

    const handleSubmit = async e => {
        e.preventDefault();

        if(email === ''){
            setAlerta({
                msg : "El email es obligatorio" , 
                error : true
            })
            return
        }

        
        try {
            await submitColaborador(email);
            setAlerta({})
        } catch (error) {
            setAlerta({msg : error.response.data.msg , error:true})
            setCargando(false)
            setColaborador({})
        }
    }

    const {msg} = alerta;

  return (
<>

    <div className='w-1/2'>
     {msg && <Alerta alerta={alerta}/>}
    </div>

    <form 
    onSubmit={handleSubmit}
    className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
        <div className='mb-5'>
            <label htmlFor="email"
                   className='text-gray-400 uppercase font-bold text-sm'>
                Email Colaborador
            </label>

            <input type="email" id='email'
            placeholder='Email Colaborador'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full border-2 p-2 mt-2 rounded-md placeholder-gray-400'/>
        </div>

        <input type="submit" 
         className='text-center bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-lg w-full uppercase
         font-bold cursor-pointer'
         value="Buscar Colaborador"/>
    </form>
</>   
  )
}

export default FormularioColaborador

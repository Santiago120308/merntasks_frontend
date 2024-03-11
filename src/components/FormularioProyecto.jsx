import React, { useEffect, useState } from 'react'
import Alerta from './Alerta';
import useProyectos from '../hooks/useProyectos';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioProyecto = () => {

    const [nombre , setNombre] = useState('');
    const [descripcion , setDescripcion] = useState('');
    const [fechaEntrega , setFechaEntrega] = useState('');
    const [cliente , setCliente] = useState('');
    const [alerta , setAlerta] = useState({});
    const navigate = useNavigate();
    

    const {proyectoSubmit , proyecto} = useProyectos();
    const params = useParams()
   

    useEffect(() => {
        if(params._id){
            
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion);
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
            setCliente(proyecto.cliente);

        }else{
            console.log('nuevo')
        }
    } , [params])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([nombre , descripcion , fechaEntrega , cliente].includes('')){
            setAlerta({
                msg : "Todos los campos son obligatorios" , 
                error : true
            })
            return;
        }

        setAlerta({})
       try {
        await proyectoSubmit({nombre , descripcion , fechaEntrega , cliente} , params._id);
       
       setAlerta({msg : `${params._id ? 
        "Proyecto actualizado correctamente"
            : 
        "Proyecto creado correctamente"}` , error : false})
       } catch (error) {
        
       }

       setNombre('');
       setCliente('');
       setDescripcion('');
       setFechaEntrega('');

       setTimeout(() => {
        navigate('/proyectos')
       }, 3000);

    }

    const {msg} = alerta;


  return (
    <>

    <div className='w-1/2 mx-auto'>
        {msg && <Alerta alerta={alerta}/>}
    </div>

    <div className='flex justify-center'>
        <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow' 
        onSubmit={handleSubmit}>

        <div className='text-gray-700 uppercase font-bold text-sm mb-5'>
            <label htmlFor="nombre">
                Nombre del Proyecto
            </label>

            <input type="text"
            id='nombre' 
            placeholder='Nombre del Proyecto'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}/>
        </div>

        <div className='text-gray-700 uppercase font-bold text-sm mb-5'>
            <label htmlFor="descripcion">
                Descripcion del Proyecto
            </label>

            <textarea type="text"
            id='descripcion' 
            placeholder='Descripcion del Proyecto'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            onChange={(e) => setDescripcion(e.target.value)}
             value={descripcion}/>
        </div>

        <div className='text-gray-700 uppercase font-bold text-sm mb-5'>
            <label htmlFor="fecha-entrega">
                Fecha de Entrega
            </label>

            <input type="date"
            id='fecha-entrega' 
            placeholder='Descripcion del Proyecto'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            onChange={(e) => setFechaEntrega(e.target.value)}
            value={fechaEntrega}/>
        </div>

        <div className='text-gray-700 uppercase font-bold text-sm mb-5'>
            <label htmlFor="nombre-cliente">
                Nombre del Cliente
            </label>

            <input type="text"
            id='nombre-cliente' 
            placeholder='Nombre del Cliente'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            onChange={(e) => setCliente(e.target.value)}
            value={cliente}/>
        </div>

            <input type="submit"
            value={`${params._id ? 'Actualizar Proyecto' : 'Crear Proyecto'}`}
            className='border-2 w-full p-2 mt-2 bg-sky-600 rounded-md 
            text-white font-bold uppercase cursor-pointer '/>
        </form>
    </div>
    </>
  )
}

export default FormularioProyecto

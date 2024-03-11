import React from 'react'
import { Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';

const ProyectoPreview = ({proyecto}) => {

    const {_id , nombre , cliente , creador} = proyecto;
    const {idUsuario} = useProyectos();
  
  return (
    <div className='border-b p-5 flex flex-col items-start gap-2   lg:flex lg:flex-row lg:items-center lg:gap-2'>
        <p className='flex-1'> {nombre} 
        <span className='text-gray-500 uppercase text-sm'> {cliente} </span>
        </p>

        <div className={ `${idUsuario !== creador ? 
          'grid gap-2 text-center lg:flex lg:flex-row lg:justify-between lg:w-[90%]' : ''}` }>

      <div>
        {idUsuario !== creador && 
        <p className='bg-sky-600 rounded-lg p-1 text-white font-bold uppercase'>Colaborador</p>}
      </div>

        <Link className='text-gray-600 hover:text-gray-800 uppercase'
        to={`${_id}`}>
            Ver Proyecto
        </Link>
        </div>

    </div>
  )
}

export default ProyectoPreview

import React from 'react'
import { formatearFecha } from '../helpers/formatearFecha.js'
import ModalFormularioTarea from './ModalFormularioTarea.jsx'
import useProyectos from '../hooks/useProyectos.jsx'

const TareaPreview = ({tarea}) => {

    const {handleEditarTarea , handleEliminarTarea , idUsuario , proyecto, 
    completarTarea} = useProyectos();
    
  return (
    <div className='md:flex md:justify-between'>
      <div className='flex flex-col items-start'>
        <p className='text-2xl font-bold uppercase p-2'>{tarea.nombre}</p>
        <p className='text-xl font-bold text-gray-400 p-2'>{tarea.descripcion}</p>
        <p className='text-xl font-bold p-2'>{formatearFecha(tarea.fechaEntrega)}</p>
        <p className='text-xl font-bold p-2 uppercase'>
            prioridad : <span
            className={`${tarea.prioridad === 'Alta' ? 'text-red-600' :
                          tarea.prioridad === 'Media' ? 'text-sky-500' : 'text-green-600'}`}>
                         {tarea.prioridad}</span>
            </p>
      {tarea.estado && <p
      className='text-xs bg-green-600 uppercase p-2 rounded-lg text-white 
      font-bold mb-2'>Completado por : {tarea.completado.nombre}</p>}
      </div>

      <div className='grid md:flex md:items-center md:gap-2 md:mr-2'>
       {idUsuario === proyecto.creador ? <>
        <button className='mt-5
        md:w-auto md:mt-0 text-white px-5 py-3 font-bold rounded-lg bg-blue-700'
        onClick={() => handleEditarTarea(tarea)}>
            EDITAR
        </button>
       </> : ''}
        <button className={`mt-5 md:mt-0 text-white px-5 py-3 font-bold rounded-lg 
        ${tarea.estado ? 'bg-sky-500' : 'bg-gray-500'}`}
        onClick={() => completarTarea(tarea._id)}>
            {tarea?.estado ? 'COMPLETA' : 'INCOMPLETA'}
        </button>
       {idUsuario === proyecto.creador ? <>
        <button className='mt-5 md:mt-0 text-white px-5 py-3 font-bold rounded-lg bg-red-700'
                onClick={() => handleEliminarTarea(tarea)}>
            ELIMINAR
        </button>
       </> : ''}
      </div>

      
    </div>
  )
}

export default TareaPreview

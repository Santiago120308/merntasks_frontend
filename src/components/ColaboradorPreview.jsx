import React from 'react'
import useProyectos from '../hooks/useProyectos'



const ColaboradorPreview = ({colaborador}) => {

    const {handleModalEliminarColaborador , idUsuario , proyecto} = useProyectos();

  return (
    <div className=' border-b flex flex-col gap-3 md:flex md:flex-row md:justify-between md:items-center md:p-5 bg-white mt-5 rounded-lg'>
      <div>
        <p className='text-xl font-bold'>{colaborador.nombre}</p>
        <p className='text-slate-400 font-bold break-words'>{colaborador.email}</p>
      </div>

      <div>
        {idUsuario === proyecto.creador ? <>
          <button className='w-full mb-0 bg-red-700 uppercase text-white font-bold p-3 rounded-lg'
        onClick={() => handleModalEliminarColaborador(colaborador)}>
            Eliminar
        </button>
        </> : ''}
      </div>
    </div>
  )
}

export default ColaboradorPreview

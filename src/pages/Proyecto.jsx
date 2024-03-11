import React, { useEffect  , useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import TareaPreview from '../components/TareaPreview';
import ColaboradorPreview from '../components/ColaboradorPreview';
import Alerta from '../components/Alerta';
import io from 'socket.io-client'

let socket;

const Proyecto = () => {

  const params = useParams();
  const {_id} = params;
 
  const {obtenerProyecto , proyecto , cargando , eliminarProyecto , 
    modal , setModal , setEditandoTarea , setAlerta , alerta , idUsuario , 
    submitTareasIo , deleteTareasIo , editarTareaIo , completarTareaIo  ,
    eliminarColaboradorIo} = useProyectos();
  console.log(proyecto)


  
  console.log('ProID: ' , idUsuario)
  useEffect(() => {
    return () => {obtenerProyecto(_id)} 
  } , [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('abrir proyecto' , _id)
  } , [])

  useEffect(() => {
    socket.on('tarea agregada' , (tareaNueva) => {
     console.log('nueva io' , tareaNueva.proyecto === proyecto._id)
    if(tareaNueva.proyecto === proyecto._id && (tareaNueva.usuario._id === idUsuario || proyecto.creador === idUsuario)){
      submitTareasIo(tareaNueva);
      
    }
    })

    socket.on('tarea eliminada' , envio => {
      if(envio[0].proyecto === proyecto._id){
        deleteTareasIo(envio)
        console.log('entre tarea eliminada.io')
      }
    })

   socket.on('tarea editada' , envio => { 
      if(envio[0].proyecto === proyecto._id){
        editarTareaIo(envio)
      }
    })

    socket.on('tarea completada' , envio => {
      
      if(envio[0].proyecto === proyecto._id || envio[0].usuario._id === idUsuario){
        completarTareaIo(envio)
      }
    })

    socket.on('col eliminado' , proyectoActualizado => {
      if(proyectoActualizado._id === proyecto._id){
        eliminarColaboradorIo(proyectoActualizado)
      }

    })
})

  const {msg} = alerta;
  return (
    <>
      {cargando ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-8 border-b-8 border-sky-900"></div>
        </div>
      ) : (
        <>
          {msg ? (
            <Alerta alerta={alerta} />
          ) : (
            <>
              <div className='flex justify-between'>
                <h1 className='font-black text-4xl'>{proyecto.nombre}</h1>
                <div className='flex items-center gap-2'>
                  <div className='flex-col gap-y-10'>


              {idUsuario === proyecto.creador ? (
                <>
                  <div className='text-gray-400 hover:text-black flex gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  <Link to={`/proyectos/editar/${_id}`} className='uppercase font-bold'>Editar</Link>
                </div>

                <div className='flex gap-2 mt-5 text-gray-400 hover:text-black'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  <button className='uppercase font-bold' onClick={() => eliminarProyecto(params._id)}>Eliminar</button>
                </div>
                </>
              ) : ''}

                  
                  </div>
                </div>
              </div>
          {idUsuario === proyecto.creador ? 
          <>
            <button className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center' onClick={() => {setModal(true); setEditandoTarea(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Nueva Tarea
              </button>
          </> : ''}
              <p className='mt-10 text-2xl uppercase font-bold'>Tareas del proyecto</p>
              {proyecto.tareas?.length ? proyecto.tareas.map(tarea => (
                tarea.usuario._id === idUsuario || proyecto.creador === idUsuario ? <div key={tarea._id} className='bg-white shadow mt-5 rounded-lg'>
                <TareaPreview tarea={tarea} key={tarea._id}/>
              </div> : ''
              )) : (
                <p className='text-xl bg-white rounded-lg font-bold text-center my-5 p-16 uppercase'>No hay tareas para este proyecto</p>
              )}
              <div className='flex flex-col my-8 gap-2 items-center md:flex md:flex-row md:items-center md:justify-between md:mt-10'>
                <p className='font-bold text-xl uppercase'>Colaboradores</p>
                {idUsuario === proyecto.creador ? <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`} className='text-gray-400 uppercase font-bold hover:text-black'>Añadir</Link> : ''}
              </div>
              {proyecto.colaboradores?.length ? proyecto.colaboradores?.map(col => (<ColaboradorPreview key={col._id} colaborador={col}/>)) : (
                <p className='text-xl bg-white rounded-lg font-bold text-center my-5 p-16 uppercase'>No hay colaboradores para este proyecto</p>
              )}
              <ModalFormularioTarea modal = {modal} setModal={setModal}/>
            </>
          )}
        </>
      )}
    </>
  )

}

export default Proyecto

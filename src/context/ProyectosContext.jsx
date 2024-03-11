import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import io from 'socket.io-client'
import useAuth from "../hooks/useAuth";

let socket;

const ProyectosContext = createContext();

const ProyectosProvaider = ({children}) => {

    
    const [colaborador , setColaborador] = useState({});
    const [proyectos , setProyectos] = useState([]);
    const [proyecto , setProyecto] = useState({});
    const [cargando , setCargando] = useState(false);
    const [modal , setModal] = useState(false)
    const [tareaActualizada , setTarea] = useState({});
    const [editandoTarea , setEditandoTarea] = useState(false);
    const [alerta , setAlerta] = useState({})
    const idUsuario = localStorage.getItem('id');
    const [buscador , setBuscador] = useState(false);
    const navigate = useNavigate();
    const {auth} = useAuth();

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    } , [])

  

    useEffect(() => {
        const obtenerProyectos = async () => {
            const token = localStorage.getItem('token');

        if(!token) return;

        const config = {
            headers : {
                "Content-Type" : "application/json" ,
                Authorization : `Bearer ${token}`
            }
        }

        const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`,
        config)

        setProyectos(data);
        } 

        return () => {obtenerProyectos()}
    } , [auth])
    
    const proyectoSubmit = async (proyecto , id) => {
        
        try {
            const token = localStorage.getItem('token');
         
            if(!token) return;

            const config = {
                headers : {
                    "Content-Type" : "application/json" ,
                    Authorization : `Bearer ${token}`
                }
            }

            if(!id){
                const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos` ,
                proyecto , config)    
                setProyectos([...proyectos ,data])
               
            }else{
                try {
                    const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}` ,
                proyecto , config) 
                
                const proyectosActualizados = proyectos.map(pro => 
                    pro._id === data._id ? data : pro);

                setProyectos(proyectosActualizados);
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${error.response.data.msg}`,
                        
                      });
                }

            }
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true);
        try {

            const token = localStorage.getItem('token');

            if(!token) return;

            const config = {
                headers : {
                    "Content-Type" : "application/json" ,
                    Authorization : `Bearer ${token}`
                }
            }

            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}` ,
            config);
            setProyecto(data)
            setAlerta({})
        } catch (error) {
           

            setAlerta({msg : error.response.data.msg , error : true})
        }
        setCargando(false)
    }

    const eliminarProyecto = async id => {
        Swal.fire({
            title: "Estas seguro de elimar el proyecto?",
            text: "No podras recuper la informacion!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText : "Cancelar"
          }).then( async (result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Eliminado!",
                text: "El proyecto ha sido eliminado",
                icon: "success"
              });
              try {

                const token = localStorage.getItem('token');
    
                if(!token) return;
    
                const config = {
                    headers : {
                        "Content-Type" : "application/json" ,
                        Authorization : `Bearer ${token}`
                    }
                }
    
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}` ,
                config);
                const proyectosActualizados = proyectos.filter(proyect => proyect._id !== id);
                setProyectos(proyectosActualizados);
                
                navigate("/proyectos")  
            } catch (error) {
                console.log(error)
            }

            }else{
                Swal.fire({
                    title: "Accion cancelada",
                    text: "El proyecto no ha sido eliminado",
                    icon: "error"
                  });
            }
          });
    }

    const nuevaTarea = async tarea => {
        
        try {
            const token = localStorage.getItem('token');
    
                if(!token) return;
    
                const config = {
                    headers : {
                        "Content-Type" : "application/json" ,
                        Authorization : `Bearer ${token}`
                    }
                }

           if(!editandoTarea) {
            try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas` , tarea, config)
            

            setModal(false)
            
            //socket.io
            socket.emit('nueva tarea' , data)
           
            } catch (error) {
                setModal(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.response.data.msg}`,
                    
                  });
            }
           }else{
            
           try {
            const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tareaActualizada._id}` , tarea, config)
            console.log('tareaIO ' , tarea)
            const proyectoActualizado = {
                ...proyecto,
                tareas: proyecto.tareas.map(task =>
                  task._id === tareaActualizada._id ? data : task
                )
              };
            
            setModal(false)
            const envio = [tarea , proyectoActualizado]
            socket.emit('editar Tarea' , envio)
           } catch (error) {
            setModal(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.msg}`,
                
              });
           }
           }
    
        } catch (error) {
            console.log(error)
        }
    }

    const handleEliminarTarea = async tarea => {
       
        const id = tarea._id;

        Swal.fire({
            title: "Estas seguro de eliminar esta tarea?",
            text: "No podras recuper la informacion!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText : "Cancelar"
          }).then( async (result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Eliminado!",
                text: "La tarea ha sido eliminada",
                icon: "success"
              });
              
              const token = localStorage.getItem('token');
    
              if(!token) return;
  
              const config = {
                  headers : {
                      "Content-Type" : "application/json" ,
                      Authorization : `Bearer ${token}`
                  }
              }
  
  
              const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${id}` ,  config)
              console.log(data)

              const proyectoActualizado = {
                ...proyecto , 
                tareas : proyecto.tareas.filter(tar => tar._id != tarea._id)
            }
    
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${tarea.proyecto
            }` , {tareas : proyectoActualizado.tareas},  config)
  
              const envio = [tarea , proyectoActualizado]
              socket.emit('eliminar tarea' , envio);
            }else{
                Swal.fire({
                    title: "Accion cancelada",
                    text: "La tarea no ha sido eliminada",
                    icon: "error"
                  });
                  return
            }
          });


    }
    const handleEditarTarea = tarea => {
      console.log(tarea)
      setTarea(tarea)
      setModal(true);
      setEditandoTarea(true)
    }

    const submitColaborador = async email => {
        setCargando(true)
        const token = localStorage.getItem('token');
    
              if(!token) return;
  
              const config = {
                  headers : {
                      "Content-Type" : "application/json" ,
                      Authorization : `Bearer ${token}`
                  }
              }
        
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/colaboradores`,
        {email} , config)
        setColaborador(data)
        setCargando(false)
        
    }

    const agregarColaborador = async email => {
      console.log(email)
      console.log(proyecto._id)
      const id = proyecto._id;

      const token = localStorage.getItem('token');
    
              if(!token) return;
  
              const config = {
                  headers : {
                      "Content-Type" : "application/json" ,
                      Authorization : `Bearer ${token}`
                  }
              }

        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/colaboradores/${id}` ,
        {email} , config) 



        return data;
    }

    const handleModalEliminarColaborador = colaborador => {

        setColaborador(colaborador);
        const id = proyecto._id;
        Swal.fire({
            title: `Estas seguro de eliminar a ${colaborador.nombre} como colaborador?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText : "Cancelar"
          }).then( async (result) => {
            if (result.isConfirmed) {

               try {
                const token = localStorage.getItem('token');
    
                if(!token) return;
    
                const config = {
                    headers : {
                        "Content-Type" : "application/json" ,
                        Authorization : `Bearer ${token}`
                    }
                }
  
          await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/eliminar-colaborador/${id}` ,
          {col : colaborador._id} , config) 

          const proyectoActualizado = {...proyecto}
          proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(col => col._id !== colaborador._id)
          socket.emit('eliminar colaborador' ,  proyectoActualizado);      
          
              Swal.fire({
                title: "Eliminado!",
                text: "El colaborador ha sido eliminado",
                icon: "success"
              });
               } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.response.data.msg}`,
                    
                  });
               }
                          
  
            }else{
                Swal.fire({
                    title: "Accion cancelada",
                    text: "El colaborador no ha sido eliminado",
                    icon: "error"
                  });
                  return
            }
          });

    }

    const completarTarea = async id=> {
       
          try {
            const token = localStorage.getItem('token');

            if(!token) return;

            const config = {
                headers : {
                    "Content-Type" : "application/json" ,
                    Authorization : `Bearer ${token}`
                }
            }

          const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/estado/${id}`, {} ,config)
          console.log('Estado' , data)

          const proyectoActualizado = {...proyecto};
          proyectoActualizado.tareas = proyectoActualizado.tareas
          .map(tareaState => tareaState._id === data._id ? data : tareaState);
          const envio = [data ,  proyectoActualizado]
          socket.emit('completar tarea' , envio);
          
          } catch (error) {
            console.log(error)
          }

    }

    const handleBuscador = () => {
        setBuscador(!buscador)
    }

    //socket.io

    const submitTareasIo = (tarea) => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = [...proyectoActualizado.tareas , tarea]
        setProyecto(proyectoActualizado)
    }

    const deleteTareasIo = envio => {
        const proyectoActualizado = envio[1];
        setProyecto(proyectoActualizado)
    }

    const editarTareaIo = envio => {
        const proyectoActualizado = envio[1];
        setProyecto(proyectoActualizado)
    }

    const completarTareaIo = envio => {
        const proyectoActualizado = envio[1];
        setProyecto(proyectoActualizado)
    }

    const eliminarColaboradorIo = (proyectoActualizado) => {
        setProyecto(proyectoActualizado)
    }

    const agregarColaboradorIo = ( )=> {

    }
    
    const cerrarSesion = () => {
        setProyecto({})
        setProyectos([])
        setColaborador({})
        setAlerta({})
    }

   return (
    <ProyectosContext.Provider
    value={{
    proyectos,
    proyectoSubmit ,
    obtenerProyecto,
    eliminarProyecto , 
    nuevaTarea ,
    setModal ,
    handleEditarTarea ,
    setEditandoTarea ,
    handleEliminarTarea , 
    submitColaborador ,
    setCargando ,
    setColaborador ,
    agregarColaborador ,
    handleModalEliminarColaborador ,
    setAlerta ,
    completarTarea ,
    handleBuscador , 
    submitTareasIo ,
    deleteTareasIo ,
    editarTareaIo ,
    completarTareaIo ,
    cerrarSesion ,
    eliminarColaboradorIo ,
    buscador ,
    proyecto,
    cargando ,
    modal,
    editandoTarea , 
    tareaActualizada ,
    colaborador , 
    alerta , 
    idUsuario}}>
        {children}
    </ProyectosContext.Provider>
   )
}

export {
    ProyectosProvaider
}

export default ProyectosContext;
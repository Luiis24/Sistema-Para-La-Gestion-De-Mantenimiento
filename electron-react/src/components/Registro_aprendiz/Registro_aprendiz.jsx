import React, { useState, useEffect } from "react";
import "./Registro_aprendiz.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@nextui-org/react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'
import {Titulo_sena_cb} from '../Titulo_sena_cb/Titulo_sena_cb'

export const Registro_aprendiz = () => {
  const [tipo_doc_aprendiz, setTipo_doc_aprendiz] = useState("");
  const [num_doc_aprendiz, setNum_doc_aprendiz] = useState("");
  const [ficha_aprendiz, setFicha_aprendiz] = useState("");
  const [programa_aprendiz, setProgramaAprendiz] = useState("");
  const [otroPrograma, setOtroPrograma] = useState('');
  const [nombre_aprendiz, setNombre_aprendiz] = useState("");
  const [email_aprendiz, setEmail_aprendiz] = useState("");
  const [telefono_aprendiz, setTelefono_aprendiz] = useState("");
  const [equipo_aprendiz, setEquipo_aprendiz] = useState("");
  const [password_aprendiz, setPassword_aprendiz] = useState("");
  const [idInstructor, setIdInstructor] = useState('')

  const [Instructores, setInstructores] = useState([])
  const { isLoading, setIsLoading } = useLoading();

  const enviarAP = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true)
      if(isInvalid || isInvalidDocumento){
        toast.error('Campos llenados de manera incorrecta')
        setIsLoading(false)
        return
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/registerAprendiz`,
        {
          tipo_doc_aprendiz,
          num_doc_aprendiz,
          ficha_aprendiz,
          programa_aprendiz: programa_aprendiz === 'Otro' ? otroPrograma : programa_aprendiz,
          nombre_aprendiz,
          email_aprendiz,
          telefono_aprendiz,
          equipo_aprendiz,
          password_aprendiz,
          id_instructor: idInstructor,
          estado: 'activo'
        }
      );
      setIsLoading(false)
      toast.success("Aprendiz Registrado Exitosamente");
      window.location.href = '/aprendices'
    } catch (error) {
      setIsLoading(false)
      toast.error("Error de registro");
    }
  };

  const Documento = [
    {
      label: "Cédula de Ciudadania",
      value: "Cédula de Ciudadania",
    },
    {
      label: "Tarjeta de Identidad",
      value: "Tarjeta de Identidad",
    },
    {
      label: "Cédula de Extranjeria",
      value: "Cédula de Extranjeria",
    },
    {
      label: "Otro",
      value: "Otro",
    },
  ];

  const Programa = [
    {
      label: "Técnico mecánico en maquinaria",
      value: "Técnico mecánico en maquinaria",
    },
    {
      label: "Tecnólogo en mantenimiento electromecanico",
      value: "Tecnólogo en mantenimiento electromecanico",
    },
    {
      label: "Técnico en mecanizado",
      value: "Técnico en mecanizado",
    },
    {
      label: "Tecnólogo en mantenimiento mecánico",
      value: "Tecnólogo en mantenimiento mecánico"
    },
    {
      label: "Otro",
      value: "Otro"
    },
  ];


  useEffect(() => {
    setIsLoading(true)
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/instructores`)
        .then(datos => {
            setInstructores(datos.data);
            setIsLoading(false)
        })
        .catch(error => {
            setIsLoading(false)
            console.error('Error al obtener los datos:', error);
        });
}, []);

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const EyeSlashFilledIcon = (props) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
  const EyeFilledIcon = (props) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setProgramaAprendiz(selectedValue);
  };

  const handleOtroInputChange = (event) => {
    // Actualiza el estado de otroPrograma cuando se ingresa texto
    setOtroPrograma(event.target.value);
  };
  
  // Validaciones del form

  const soloLetras = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
     if (
      charCode !== 32 && // Espacio
      (charCode < 65 || charCode > 90) && // Letras mayúsculas
      (charCode < 97 || charCode > 122) && // Letras minúsculas
      charCode !== 209 && charCode !== 241 // Letra Ñ y letra ñ
    ) {
      event.preventDefault();
      return false;
    }
    return true;
  };

  const validatePassword = (e) => e.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);

  const isInvalid = React.useMemo(() => {
    if (password_aprendiz === "") return false;

    return validatePassword(password_aprendiz) ? false : true;
  }, [password_aprendiz]);

  const validateDocument = (e) => e.match(/^[0-9]{10,10}$/);
  const isInvalidDocument = React.useMemo(() => {
    if (telefono_aprendiz === "") return false;

    return validateDocument(telefono_aprendiz) ? false : true;
  }, [telefono_aprendiz]);

  const validateDocumento = (e) => e.match(/^[0-9]{9,12}$/);
  const isInvalidDocumento = React.useMemo(() => {
    if (num_doc_aprendiz === "") return false;

    return validateDocumento(num_doc_aprendiz) ? false : true;
  }, [num_doc_aprendiz]);

  return (
    <div className="container-registro-aprendiz">
      <ToastContainer />
      {isLoading ? <Cargando /> : ''}
      <div className="w-full flex justify-start"><Titulo_sena_cb/></div>
      <div className="registrar-nuevo-aprendiz my-5">
        <form onSubmit={enviarAP} className="mb-5">
          <h2 className="titulo-registro-ap">Registrar nuevos aprendices</h2>
          <div className="inputs-registro-aprendiz">
            <div className="inputs-primer-fila-registro-aprendiz">
              {/*NOMBRE*/}
              <h3 className="h3-fila-1">Nombre</h3>
              <Input
                className="w-full mt-7"
                placeholder="Nombre completo"
                type="text"
                onKeyPress={soloLetras}
                name="nombre_aprendiz"
                onChange={(e) => setNombre_aprendiz(e.target.value)}
              />
              {/*TELÉFONO*/}
              <h3 className="h3-fila-1">Teléfono</h3>
              <Input
                className="w-full mt-7"
                placeholder="Número de teléfono"
                type="number"
                name=""
                onChange={(express) =>
                  setTelefono_aprendiz(express.target.value)
                }
                isInvalid={isInvalidDocument}
                errorMessage={isInvalidDocument && "Este campo requiere 10 digitos"}
              />
              {/*DOCUMENTO/SELECT */}
              <h3 className="h3-fila-1">Tipo de documento</h3>
              <Select
                className="w-full mt-7"
                placeholder="Seleccione tipo documento"
                onChange={(express) =>
                  setTipo_doc_aprendiz(express.target.value)
                }
              >
                {Documento.map((documento) => (
                  <SelectItem key={documento.value} value={documento.value} className="w-full py-3">
                    {documento.label}
                  </SelectItem>
                ))}
              </Select>
              {/*NUM-DOCUMENTO*/}
              <h3 className="h3-fila-1">Número de documento</h3>
              <Input
                className="w-full mt-7"
                placeholder="Número de documento"
                type="number"
                name=""
                onChange={(express) =>
                  setNum_doc_aprendiz(express.target.value)
                }
                isInvalid={isInvalidDocumento}
                errorMessage={isInvalidDocumento && "Este campo requiere entre 9 y 12 digitos"}
              />
              {/*EMAIL*/}
              <h3 className="h3-fila-1">Correo Electrónico</h3>
              <Input
                className="w-full mt-7"
                placeholder="Ingresa tú email "
                type="email"
                name=""
                onChange={(express) => setEmail_aprendiz(express.target.value)}
              />
            </div>
            {/*FILA #2*/}
            <div className="inputs-segunda-fila-registro-aprendiz">
              {/*INSTRUCTOR*/}
              <h3 className="h3-fila-2">Instructor</h3>
              <Select
                className="w-full mt-7"
                placeholder="Instructor"
                onChange={(e) => setIdInstructor(e.target.value)}
              >
                {Instructores.map((Instructor) => (
                  <SelectItem key={Instructor.id_instructor} value={Instructor.id_instructor} className="w-full py-3">
                    {Instructor.nombre_instructor}
                  </SelectItem>
                ))}
              </Select>
              {/*FICHA*/}
              <h3 className="h3-fila-2">Ficha</h3>
              <Input
                className="w-full mt-7"
                placeholder="Ficha"
                type="number"
                name=""
                onChange={(express) => setFicha_aprendiz(express.target.value)}
              />
              {/*PROGRAMA/SELECT*/}
              <h3 className="h3-fila-2">Programa</h3>
              {programa_aprendiz === 'Otro' ? ( // Si el programa seleccionado es 'otro', muestra un Input
                <Input
                  className="w-full mt-7"
                  placeholder="Escribe otro programa"
                  value={otroPrograma}
                  onKeyPress={soloLetras}
                  onChange={handleOtroInputChange}
                />
              ) : (
                <Select
                  className="w-full mt-7"
                  placeholder="Programa de formación"
                  value={programa_aprendiz || 'Programa de formación'} // Asigna 'placeholder' cuando programaAprendiz es vacío
                  onChange={handleSelectChange}
                >
                  {Programa.map((programa) => (
                    <SelectItem key={programa.value} value={programa.value} className="w-full py-3">
                      {programa.label}
                    </SelectItem>
                  ))}
                </Select>
              )}

              {/*EQUIPO*/}
              <h3 className="h3-fila-2">Equipo</h3>
              <Input
                className="w-full mt-7"
                placeholder="Equipo de trabajo"
                type="number"
                name=""
                onChange={(express) => setEquipo_aprendiz(express.target.value)}
              />

              {/*PASSWORD*/}
              <h3 className="h3-fila-2">Contraseña</h3>
              <Input
                onChange={(express) =>
                  setPassword_aprendiz(express.target.value)
                }
                variant="bordered"
                placeholder="Ingresa tu contraseña"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full mt-7"
                isInvalid={isInvalid}
                // color={isInvalid ? "danger" : "success"}
                errorMessage={isInvalid && "Este campo requiere mayusculas, minusculas y numeros (min 8 digitos)"}
              />
            </div>
          </div>
          <div className="btn-terminar">
            <Link to={"/aprendices"}>
              <Button className="boton-cancelar-aprendices">
              <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
                </svg> Atrás
              </Button>
            </Link>
            <Button className="boton-registrar-ap" type="submit">
              Registrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
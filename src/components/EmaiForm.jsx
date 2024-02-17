import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import Radiobuttons from '../components/RadioButtons.astro'

export default function Home() {
  // Estados para los valores del formulario
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [celular, setCelular] = useState('')
  const [placa, setPlaca] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState('1')

  // Función para manejar el cambio de selección del radio button
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
    console.log(event.target.value)
  }

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Realizar la solicitud fetch
      const response = await toast.promise(
        fetch('/api/sendEmail.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            //to: 'segurosgodtello@gmail.com',
            to: 'lexzum10@gmail.com',
            subject: 'Información SOAT',
            html: `<div>
          <p>Nombre: ${nombres} ${apellidos} </p>  
          <p>Celular: ${celular}</p>
          <p>Placa: ${placa}</p>
          <p>Comunicarse mediante: ${
            selectedOption == 1 ? 'Whatsapp' : 'Llamada'
          }</p>
          </div>`,
            text: `${nombres} ${apellidos} ${celular} ${selectedOption}`
          })
        }),
        {
          pending: 'Enviando Correo...',
          success: 'Enviado Correctamente 👌',
          error: 'Intenta de nuevo🤯'
        }
      )
      console.log(response)

      if (response.ok) {
        console.log('La petición POST fue exitosa')
        // Aquí puedes realizar cualquier acción adicional después de que la petición sea exitosa
        setNombres('')
        setApellidos('')
        setCelular('')
        setIsLoading(false)
      } else {
        console.error('Error al realizar la petición POST')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error al procesar la petición:', error)
      setIsLoading(false)
    }
  }

  /*   const notify = () => {
    return new toast('🦄 Wow so easy!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    })
  } */

  const RadioButtons = () => {
    return (
      <div className="container">
        <label className="label">Comunicarse Mediante</label>
        <div className="radio-inputs flex gap-6">
          <label>
            <input
              className="radio-input"
              type="radio"
              name="engine"
              value="1"
              checked={selectedOption === '1'}
              onChange={handleOptionChange}
            />
            <span className="radio-tile">
              <span className="radio-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-brand-whatsapp"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
                  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
                </svg>
              </span>
              <span className="radio-label">Whatsapp</span>
            </span>
          </label>
          <label>
            <input
              className="radio-input"
              type="radio"
              name="engine"
              value="2"
              checked={selectedOption === '2'}
              onChange={handleOptionChange}
            />
            <span className="radio-tile">
              <span className="radio-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-phone-call"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                  <path d="M15 7a2 2 0 0 1 2 2" />
                  <path d="M15 3a6 6 0 0 1 6 6" />
                </svg>
              </span>
              <span className="radio-label">Llamada</span>
            </span>
          </label>
        </div>
      </div>
    )
  }

  return (
    /*     <main className="flex flex-col h-screen md:flex-row">
      <section className="flex flex-1 items-center py-10 h-full bg-[#212121]">
        <img className="" src="/img/Imagenv3.png" alt="" />
      </section> */
    <section className="flex-1 bg-[#212121] py-10 px-4">
      <div className="flex flex-col gap-6 justify-evenly px-2 mx-auto max-w-2xl h-full md:px-10">
        <picture className="flex justify-center">
          <img
            className="object-cover h-32 md:h-48"
            src="https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/AEY6AXJIE5G6DJKY264FVMN2FI.jpg"
            alt=""
          />
        </picture>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 text-white"
        >
          <div className="container">
            <label className="label">Nombres</label>
            <input
              className="input"
              required
              type="text"
              name="nombres"
              placeholder="Nombres"
              id="nombres"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />
          </div>
          <div className="container">
            <label className="label">Apellidos</label>
            <input
              className="input"
              required
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              id="apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>

          <div className="flex flex-1 flex-col gap-10 sm:gap-4 items-center sm:flex-row">
            <div className="container flex-1">
              <label className=" label">Celular</label>
              <input
                className="flex-1 input"
                required=""
                type="text"
                name="celular"
                placeholder="Celular"
                id="celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
              />
            </div>
            <div className="container flex-1">
              <label className=" label">Placa</label>
              <input
                className="flex-1 input"
                required=""
                type="text"
                name="placa"
                placeholder="Placa"
                id="placa"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
              />
            </div>
          </div>

          <RadioButtons />
          <button
            type="submit"
            className="text-sm md:text-lg lg:text-xl button disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Contactame
          </button>
        </form>
      </div>

      <div>
        {/* <button onClick={notify}>Notify !</button> */}
        <ToastContainer position="bottom-right" />
      </div>
    </section>
    /*  </main> */
  )
}

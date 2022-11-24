import { useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  /* const [count, setCount] = useState(0) */
  const [movie,setMovies] = useState([])
  const [open,setOpen] = useState(false)
  //useRef es como una refernecia (getElementbyid)
  const userNameRef = useRef();
  const passRef = useRef();
 
  useEffect(()=>{
    async function getMovies(){
      //estamos trayendo la base de datos de movies
      const response = await fetch("http://localhost:8080/api/v1/movies");
      //le decimos que la response sera un metodo json  
      const data = response.json()
      console.log(data)
    };
    getMovies().catch(console.log);
  },[])

  const onSubmit =(e)=>{
    e.preventDefault();
    const username = userNameRef.current.value;
    const password = passRef.current.value;
    console.log({username,password})
    fetch("http://localhost:8080/api/v1/user/login",{
      method:"POST",
      headers:{"content-type":"application/json"},
      //solicitamos username y password del ref
      body: JSON.stringify({username, password})
    })//".then" the an promize is the same that line 14
    //.then(response => response.json())
    .then(function(response){
      return response.json()
    }).then(function(data){
      console.log(data)
    })
  }

  return(
    <div className='App'>
      <h1>Hola mundo</h1>
      <form onSubmit={onSubmit} style={{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"start"}}>
          <label htmlFor='userName'>Username</label>
          <input type="text" id="userName" ref={userNameRef}/>
          <label htmlFor='password'>Password</label>
          <input type="password" id="password" ref={passRef}/>
          <button>Enviar</button>
      </form>
    </div>
  )
}

export default App
 /* { <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div> } */

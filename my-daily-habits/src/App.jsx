import './App.css'
import Footer from './components/Footer'
import Habits from './components/Habits'
import Button from './components/Button'
import Header from './components/Header'
import BemVindo from './components/BemVindo'

function App() {

  return (
    <div>

      <Header titulo={"My Daily Habits"} descricao={"Gerencie seus hábitos diários de forma simples e visual."} />

      <BemVindo nomeUsuario={"Álefe"} totalHabitos={1}/>    

      {/*<Button name={"Clique aqui"}/>*/}

      <Footer/>
    </div>

    /*
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
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
    </>
    */
  )
}

export default App

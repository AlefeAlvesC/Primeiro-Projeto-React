import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import BemVindo from './components/BemVindo'
import SecaoHabitos from './components/SecaoHabitos'
import HabitList from './components/HabitList'
import { HabitsProvider } from './contexts/HabitsContext'


function App() {


  return (

    <HabitsProvider>

      <div>
        <Header titulo={"My Daily Habits"} descricao={"Gerencie seus hábitos diários de forma simples e visual."} />

        <BemVindo nomeUsuario={"Álefe"} /> 

        <SecaoHabitos titulo={"Meus Hábitos"}>
          <HabitList></HabitList>
        </SecaoHabitos>

        <Footer/>
      </div>

    </HabitsProvider>
    
  )
}

export default App

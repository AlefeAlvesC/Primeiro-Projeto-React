import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import BemVindo from './components/BemVindo'
import SecaoHabitos from './components/SecaoHabitos'
import HabitList from './components/HabitList'


function App() {
  {/*
  function tamanhoArray(){
    const stored = localStorage.getItem("my-daily-habits");
    
    try{
      return JSON.parse(stored);
    }catch{
      return [];
    };
  };
  */}


  return (
    <div>

      <Header titulo={"My Daily Habits"} descricao={"Gerencie seus hábitos diários de forma simples e visual."} />

      <BemVindo nomeUsuario={"Álefe"} /*totalHabitos={tamanhoArray().length}*//> 

      <SecaoHabitos titulo={"Meus Hábitos"}>
        <HabitList></HabitList>
      </SecaoHabitos>

      <Footer/>
    </div>
  )
}

export default App

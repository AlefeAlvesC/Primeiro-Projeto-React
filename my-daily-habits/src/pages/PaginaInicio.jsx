import {Link} from 'react-router-dom';
import { useHabits } from '../contexts/HabitsContext';

function PaginaInicio() {
    const { habits } = useHabits();

    const habitosAtivos = habits.filter(habit => habit.ativo).length;

    return(
        <main className="pagina-inicio">
            <div className='resumo-intro'>
                <h1>My Daily Habits</h1>
                <p>Construindo uma rotina melhor, um hábito por vez.</p>
            </div>
            

            <div className="resumo">
                <div className="resumo-card">
                    <strong>{habits.length}</strong>
                    <span>hábitos cadastrados</span>
                </div>
                <div className="resumo-card">
                    <strong>{habitosAtivos}</strong>
                    <span>hábitos ativos</span>
                </div>
            </div>

            <Link to="/habitos" className="btn-primario">
                Ver meus hábitos →
            </Link>

        </main>
    );
};

export default PaginaInicio;
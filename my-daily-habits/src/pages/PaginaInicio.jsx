import {Link} from 'react-router-dom';
import { useHabits } from '../contexts/HabitsContext';

function PaginaInicio() {
    const { habits } = useHabits();

    const habitosAtivos = habits.filter(habit => habit.ativo).length;

    return(
        <main className="pagina-inicio">
            <h1>My Daily Habits</h1>
            <p>Construindo uma rotina melhor, um hábito por vez.</p>

            <div className="resumo">
                <div className="resumo-card">
                    <span><strong>{habits.length}</strong> hábitos cadastrados</span>
                </div>
                <div className="resumo-card">
                    <span><strong>{habitosAtivos}</strong> ativos agora</span>
                </div>
            </div>

            <Link to="/habitos" className="btn-primario">
                Ver meus hábitos →
            </Link>

        </main>
    );
};

export default PaginaInicio;
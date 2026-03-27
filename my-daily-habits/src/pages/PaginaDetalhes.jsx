import { useParams, useNavigate } from "react-router-dom";
import { useHabits } from "../contexts/HabitsContext";

function PaginaDetalhes (){
    const {id} = useParams();
    const { habits, removerHabit } = useHabits();
    const navigate = useNavigate();

    const habit = habits.find(h => h.id === Number(id)); 

    if(!habit){
        return(
            <main className="pagina-detalhes no-habits">
                <h1>Hábito não encontrado</h1>
                <div>
                    <button onClick={() => navigate("/habitos")} className="btn-primario btn-voltar">
                        ← Voltar para a lista
                    </button>
                </div>

            </main>
        );
    }

    const metaAtingida = habit.diasFeitos >= habit.meta;

    const handleRemover = () => {
        removerHabit(habit.id);
        navigate("/habitos")
    };

    return (
        <main className="pagina-detalhes">
            <div>
                <h1>{habit.titulo}</h1>
                <p>{habit.descricao}</p>

            </div>
            
            <ul>
                <li><strong>Categoria: </strong><span>{habit.categoria || "Geral"}</span></li>
                <li><strong>Meta semanal: </strong><span>{habit.meta} dias</span></li>
                <li><strong>Dias feitos: </strong><span>{habit.diasFeitos}</span></li>
                <li>
                    <strong>Status: </strong> {''}
                    <span>
                        {habit.ativo ? "✅ Ativo" : "⏸️ Pausado"}
                    </span>
                </li>

                {
                    metaAtingida && (<li style={{gridColumnStart: "1", gridColumnEnd: "3"}}> 🏆 Meta da semana atingida!</li>)
                }
            </ul>

            <div className="btns-detalhe">
                <button onClick={() => navigate(-1)} className="btn-primario btn-voltar">
                    ← Voltar
                </button>

                <button onClick={handleRemover} className="btn-primario btn-remover">
                    Remover hábito
                </button>
            </div>

        </main>
    );
};

export default PaginaDetalhes;
import { Link } from "react-router-dom";

export default function HabitCard({id, titulo, descricao = "", meta, ativo = true, diasFeitos = 0, categoria = "Geral", onRemover, onToggle}) {
    const metaAtingida = diasFeitos >= meta;
    const mensagemMeta = metaAtingida ? "🏆 Meta da semana atingida!" : `${diasFeitos} de ${meta} dias concluídos`;
    
    return(
        <div className="habit-card">
            <div className="habit-card-header">
                <h3>{titulo}</h3> {/*No meu caso, nome é o titulo*/}
                {descricao && <p>{descricao}</p>}
                <p>{mensagemMeta}</p>
                <small>Categoria: {categoria}</small>
                <p style={{color: ativo ? "#16a34a" : "#9ca3af" }} >{ativo ? "✅ Ativo" : "⏸️ Pausado"}</p> {/*Troquei para p para um melhor comportamento*/}

                {metaAtingida && <p>⭐ Parabéns, você manteve a sequência essa semana!</p>}
            </div>
            
            <div className="habit-card-acoes">
                <Link to={`/habitos/${id}`} className="btn-detalhes">
                    Ver Detalhes
                </Link>

                {onRemover && (
                    <button type="button" onClick={onRemover} className="btn-primario btn-remover-card">
                        Remover Hábito
                    </button>
                )}

                {onToggle && (
                    <button type="button" onClick={onToggle} className="btn-primario btn-toggle-card">
                        {ativo ? "Pausar" : "Ativar"}
                    </button>
                )}
            </div>
        </div>
    )    
};
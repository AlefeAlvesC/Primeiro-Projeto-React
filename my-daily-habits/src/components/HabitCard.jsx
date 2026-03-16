export default function HabitsCard({titulo, descricao = "", meta, ativo = true, diasFeitos = 0, categoria = "Geral", onRemover}) {
    const metaAtingida = diasFeitos >= meta;
    const mensagemMeta = metaAtingida ? "🏆 Meta da semana atingida!" : `${diasFeitos} de ${meta} dias concluídos`;
    
    return(
        <div className="habit-card">
            <div>
                <h3>{titulo}</h3> {/*No meu caso, nome é o titulo*/}
                {descricao && <p>{descricao}</p>}
                <p>{mensagemMeta}</p>
                <small>Categoria: {categoria}</small>
                <p>{ativo ? "✅ Ativo" : "⏸️ Pausado"}</p> {/*Troquei para p para um melhor comportamento*/}

                {metaAtingida && <p>⭐ Parabéns, você manteve a sequência essa semana!</p>}
            </div>
            
            
            {onRemover && (
                <button type="button" onClick={onRemover}>
                    Remover Hábito
                </button>
            )}
        </div>
    )    
};
export default function HabitsCard({titulo, meta, ativo = true, diasFeitos = 0, categoria = "Geral"}) {
    const metaAtingida = diasFeitos >= meta;
    const mensagemMeta = metaAtingida ? "Meta atingida!" : `${diasFeitos} de ${meta} dias concluídos`;
    
    return(
        <div className="habit-card">
            <h3>{titulo}</h3>
            <p>{mensagemMeta}</p>
            <small>Categoria: {categoria}</small>
            <br />
            <span>{ativo ? "Ativo" : "Pausado"}</span>

            {metaAtingida && <p>Parabéns, você manteve a sequência essa semana!</p>}
            

        </div>
    )    
};
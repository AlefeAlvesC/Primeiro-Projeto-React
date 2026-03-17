import { useState, useEffect } from "react";
import HabitsCard from "./HabitCard";

export default function HabitList(){
    const [habits, setHabits] = useState(() => {
        const stored = localStorage.getItem("my-daily-habits");

        if(!stored) return [
            {id: 1, titulo: "Exercício", descricao: "Treino de Força", meta: 5, ativo: true, diasFeitos: 5, categoria: "Saúde"},
            {id: 2, titulo: "Leitura", descricao: "Livro ou artigo", meta: 7, ativo: true, diasFeitos: 3},
            {id: 3, titulo: "Meditação", descricao: "Respiração e foco", meta: 7, ativo: false, diasFeitos: 0},
            {id: 4, titulo: "Hidratação", descricao: "Beber 2 litros de água", meta: 5, ativo: true, diasFeitos: 7}
        ]

        try {
            return JSON.parse(stored);
        } catch{
            return [];
        }; 
    });

    useEffect(() => {
        localStorage.setItem("my-daily-habits", JSON.stringify(habits));
    }, [habits]);

    const [novoNome, setNovoNome] = useState("");
    const [novaDescricao, setNovaDescricao] = useState("");
    const [novaCategoria, setNovaCategoria] = useState("");

    const removerHabit = (id) => {
        setHabits(habits.filter(habit => habit.id !== id));
    };

    const adicionarHabit = (event) => {
        event.preventDefault();
        
        if (!novoNome.trim()){
            alert("Informe um nome para o hábito");
            return;
        }

        const novoHabit = {
            id : Date.now(),
            nome : novoNome,
            descricao : novaDescricao,
            meta : 7,
            ativo: true,
            diasFeitos: 0,
            categoria: novaCategoria || 'Geral'
        }

        setHabits([...habits, novoHabit]);
    
        setNovoNome('');
        setNovaDescricao('');
        setNovaCategoria("");
    }
    
    const limparHistorico = () => {
        localStorage.removeItem("my-daily-habits");
        setHabits([
            {id: 1, titulo: "Exercício", descricao: "Treino de Força", meta: 5, ativo: true, diasFeitos: 5, categoria: "Saúde"},
            {id: 2, titulo: "Leitura", descricao: "Livro ou artigo", meta: 7, ativo: true, diasFeitos: 3},
            {id: 3, titulo: "Meditação", descricao: "Respiração e foco", meta: 7, ativo: false, diasFeitos: 0},
            {id: 4, titulo: "Hidratação", descricao: "Beber 2 litros de água", meta: 5, ativo: true, diasFeitos: 7}
        ]);
    }
    
    if (!habits) return null;

    if (habits.lenght === 0) {
        return <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>
    }

    return (
        <section>
            <form onSubmit={adicionarHabit} className="habit-form">
                <div className="form-question">
                    <label htmlFor="nome">Nome do hábito *</label>
                    <input type="text" name="nome" id="nome" 
                        value={novoNome} 
                        onChange={(e) => setNovoNome(e.target.value)}
                    />
                </div>
                   
                <div className="form-question">
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" name="descricao" id="descricao" 
                        value={novaDescricao} 
                        onChange={(e) => setNovaDescricao(e.target.value)}
                    />
                </div>

                <div className="form-question">
                    <label htmlFor="categoria">Categoria</label>
                    <input type="text" name="categoria" id="categoria"
                        value={novaCategoria}
                        onChange={(e) => setNovaCategoria(e.target.value)}
                    />
                </div>

                <button type="submit">Adicionar Hábito</button>
            </form>

            {habits.length == 0 && <p>Nenhum hábito cadastrado ainda. Que tal começar?</p> }

            <ul>
                {habits.map((habit) => (
                    <HabitsCard
                        key={habit.id}
                        titulo={habit.titulo}
                        descricao={habit.descricao}
                        meta={habit.meta}
                        ativo={habit.ativo}
                        diasFeitos={habit.diasFeitos}
                        categoria={habit.categoria}
                        onRemover={() => removerHabit(habit.id)}
                    />
                ))}
            </ul>

            {/*Botão de reset do localStorage*/}
            <button onClick={limparHistorico}>Limpar Histórico</button>
        </section>
    )
};
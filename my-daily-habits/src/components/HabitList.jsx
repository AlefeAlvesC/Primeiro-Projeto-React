import { useState, useEffect, useRef } from "react";
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

    const [form, setForm] = useState({
        novoNome: "",
        novaDescricao: "",
        novaCategoria: "",
        novaMeta: ""
    });

    const [erro, setErro] = useState({
        erroNome: "",
        erroMeta: ""
    })


    useEffect(() => {
        localStorage.setItem("my-daily-habits", JSON.stringify(habits));
    }, [habits]);

    const nomeInput = useRef(null);

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === "novoNome"){
            setForm(prev => ({...prev, [name]: value}));
            if(value.length > 0 && value.length < 3 ){
                setErro(prev => ({...prev, erroNome: "O nome deve ter pelo menos 3 caracteres."}));
            }else{
                setErro(prev => ({...prev, erroNome: ""}));
            }    
        }

        if (name === "novaMeta"){
            setForm(prev => ({...prev, [name]: value}));
            if(value < 1 || value > 7){
                setErro(prev => ({...prev, erroMeta: "Meta deve estar entre 1 e 7 dias."}));
            }else{
                setErro(prev => ({...prev, erroMeta: ""}));
            }
        }

        setForm(prev => ({...prev, [name]: value}));
    };

    const removerHabit = (id) => {
        setHabits(habits.filter(habit => habit.id !== id));
    };

    const adicionarHabit = (event) => {
        event.preventDefault();
        
        if (!form.novoNome.trim()){
            alert("Informe um nome para o hábito");
            return;
        }


        if(erro.erroNome){
            nomeInput.current?.focus();
            return;
        }

        const novoHabit = {
            id : Date.now(),
            titulo : form.novoNome,
            descricao : form.novaDescricao,
            meta : 7,
            ativo: true,
            diasFeitos: 0,
            categoria: form.novaCategoria || 'Geral'
        }

        setHabits([...habits, novoHabit]);
    
        setForm({ novoNome: "", novaDescricao: "", novaCategoria: "", novaMeta: "" })

        nomeInput.current?.focus();
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

    return (
        <section>
            <form onSubmit={adicionarHabit} className="habit-form">
                <div className="form-question">
                    <label htmlFor="nome">Nome do hábito *</label>
                    <input type="text" name="novoNome" id="nome" 
                        value={form.novoNome} 
                        onChange={handleChange}
                        ref={nomeInput}
                    />
                    {erro.erroNome && <p style={{color: "red", fontSize: "0.8rem"}}>{erro.erroNome}</p>}
                </div>
                   
                <div className="form-question">
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" name="novaDescricao" id="descricao" 
                        value={form.novaDescricao} 
                        onChange={handleChange}
                    />
                </div>

                <div className="form-question">
                    <label htmlFor="categoria">Categoria</label>
                    <input type="text" name="novaCategoria" id="categoria"
                        value={form.novaCategoria}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-question">
                    <label htmlFor="meta">Meta</label>
                    <input type="number" name="novaMeta" id="meta"
                        value={form.novaMeta}
                        onChange={handleChange}
                    />
                    {erro.erroMeta && <p style={{color: "red", fontSize: "0.8rem"}}>{erro.erroMeta}</p>}
                </div>

                <button type="submit">Adicionar Hábito</button>
            </form>

            {habits.length == 0 && <p>Nenhum hábito cadastrado ainda. Que tal começar?</p> }

            <ul>
                {(habits.lenght === 0) 
                && 
                <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>}

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
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HabitCard from "./HabitCard";
import { useHabits } from "../contexts/HabitsContext";

export default function HabitList(){
    const { habits, adicionarHabit, removerHabit, toggleAtivo, limparHistorico} = useHabits();
    
    const navigate = useNavigate();

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

    const nomeInput = useRef(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));

        if (name === "novoNome"){
            if(value.length > 0 && value.length < 3 ){
                setErro(prev => ({...prev, erroNome: "O nome deve ter pelo menos 3 caracteres."}));
            }else{
                setErro(prev => ({...prev, erroNome: ""}));
            }    
        }

        if (name === "novaMeta"){
            if(value < 1 || value > 7){
                setErro(prev => ({...prev, erroMeta: "Meta deve estar entre 1 e 7 dias."}));
            }else{
                setErro(prev => ({...prev, erroMeta: ""}));
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!form.novoNome.trim() || erro.erroNome){
            nomeInput.current?.focus();
            return;
        }

        const novoHabit = {
            id : Date.now(),
            titulo : form.novoNome,
            descricao : form.novaDescricao,
            meta : parseInt(form.novaMeta) || 7,
            ativo: true,
            diasFeitos: 0,
            categoria: form.novaCategoria || 'Geral'
        }

        adicionarHabit(novoHabit);

        setForm({novoNome: "", novaDescricao: "", novaCategoria: "", novaMeta: ""});
        navigate("/habitos");
    }
    
    const handleRemove = (id) => {
        removerHabit(id);
    }

    const handleToggle = (id) => {
        toggleAtivo(id);
    }

    const handleHistorico = () => {
        limparHistorico();
    }

    if(!habits) return null;

    return (
        <section>
            <form onSubmit={handleSubmit} className="habit-form">
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

            {habits.length === 0 && <p>Nenhum hábito cadastrado ainda. Que tal começar?</p> }

            <ul>

                {habits.map((habit) => (
                    <HabitCard
                        key={habit.id}
                        id={habit.id}
                        titulo={habit.titulo}
                        descricao={habit.descricao}
                        meta={habit.meta}
                        ativo={habit.ativo}
                        diasFeitos={habit.diasFeitos}
                        categoria={habit.categoria}
                        onRemover={() => handleRemove(habit.id)}
                        onToggle={() => handleToggle(habit.id)}
                    />
                ))}
            </ul>

            {/*Botão de reset do localStorage*/}
            {limparHistorico && <button onClick={handleHistorico}>Limpar Histórico</button>}
            
        </section>
    )
};
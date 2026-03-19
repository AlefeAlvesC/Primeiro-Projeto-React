import { useContext } from "react";
import { useHabits } from "../contexts/HabitsContext";

export default function BemVindo({nomeUsuario/*, totalHabitos*/}) {
    const {habits} = useHabits();

    const nomeFormatado = nomeUsuario.toUpperCase();
    const totalHabitos = habits.length;
    const habitosAtivos = habits.filter(prev => (prev.ativo)).length;


    return(
        <div>
            <h2 className="saudacao">Olá, {nomeFormatado}!</h2>
            <p>Você tem <strong>{totalHabitos}</strong> hábito (s) cadastrado (s).</p>
            <p><strong>{habitosAtivos} </strong> ativo (s) no momento.</p>
        </div>
    )
}
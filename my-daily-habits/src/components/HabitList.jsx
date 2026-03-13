import HabitsCard from "./HabitCard";

export default function HabitList({habits}){
    if (!habits) return null;

    if (habits.lenght === 0) {
        return <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>
    }

    return (
        <ul>
            
            {habits.map(habit => (
                <HabitsCard
                    key={habit.id}
                    titulo={habit.titulo}
                    meta={habit.meta}
                    ativo={habit.ativo}
                    diasFeitos={habit.diasFeitos}
                    categoria={habit.categoria}
                />
            ))}
        </ul>
    )
};
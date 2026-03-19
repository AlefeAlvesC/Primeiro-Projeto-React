import { createContext, useContext, useState, useEffect } from 'react'

export const HabitsContext = createContext(null);

export function HabitsProvider({ children }){
    const [habits, setHabits] = useState(() => {
        const stored = localStorage.getItem("my-daily-habits");

        if(!stored) return [
            {id: 1, titulo: "Exercício", descricao: "Treino de Força", meta: 5, ativo: true, diasFeitos: 5, categoria: "Saúde"},
            {id: 2, titulo: "Leitura", descricao: "Livro ou artigo", meta: 7, ativo: true, diasFeitos: 3},
            {id: 3, titulo: "Meditação", descricao: "Respiração e foco", meta: 7, ativo: false, diasFeitos: 0},
            {id: 4, titulo: "Hidratação", descricao: "Beber 2 litros de água", meta: 5, ativo: true, diasFeitos: 7}
        ];

        try {
            return JSON.parse(stored);
        }catch{
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("my-daily-habits", JSON.stringify(habits))
    }, [habits]);

    const adicionarHabit = (novoHabit) => {
        setHabits(prev => ([...prev, novoHabit]));
    };

    const removerHabit = (id) => {
        setHabits(prev => (prev.filter(habit => habit.id !== id)));
    };

    const toggleAtivo = (id) => {
        setHabits(prev => 
            prev.map(h => h.id === id ? 
                {...h, ativo: !h.ativo} 
                : 
                h
        ));
    };

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
        <HabitsContext.Provider value={{ habits, adicionarHabit, removerHabit, toggleAtivo, limparHistorico }}>
            {children}
        </HabitsContext.Provider>
    );
}

export function useHabits(){
    return useContext(HabitsContext);
};


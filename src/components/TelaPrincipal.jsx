import React, { useState } from 'react';
import estilos from './TelaPrincipal.module.css';


export function TelaPrincipal() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // Função para adicionar uma nova tarefa
    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
            setNewTask('');
        }
    };

    // Função para marcar/desmarcar uma tarefa como concluída
    const handleToggleTask = (taskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        }));
    };

    // Função para remover uma tarefa da listagem
    const handleRemoveTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    // Calcula a porcentagem de tarefas concluídas
    const calculateCompletionPercentage = () => {
        if (tasks.length === 0) return 0;

        const completedTasks = tasks.filter(task => task.completed);
        return (completedTasks.length / tasks.length) * 100;
    };

    return (
        <main>
            <div className={estilos.container}>
                <h1>Lista de Tarefas</h1>
                <div className={estilos.formulario}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Adicionar nova tarefa"
                        className={estilos.botaoAdicionar}
                    />
                    <button onClick={handleAddTask}>Adicionar</button>
                </div>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} className={task.completed ? 'completed' : ''}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggleTask(task.id)}
                            />
                            <span>{task.title}</span>
                            <button className={estilos.botaoRemover} onClick={() => handleRemoveTask(task.id)}>Remover</button>
                        </li>
                    ))}
                </ul>
                <div className={estilos.progress}>
                    <p>Progresso: {calculateCompletionPercentage()}%</p>
                    <div className="bar" style={{ width: `${calculateCompletionPercentage()}%` }}></div>
                </div>
            </div>
        </main>
    );
}
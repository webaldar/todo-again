import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let tasks1: TaskType[] = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ]

    const [tasks, setTasks] = useState<TaskType[]>(tasks1)
    const [filter, setFilter] = useState<FilterType>('all')

    let tasksForTodolist = tasks
    if(filter == 'active'){
        tasksForTodolist = tasks.filter(task => (!task.isDone ))
    }
    if(filter == 'completed'){
        tasksForTodolist = tasks.filter(task => ( task.isDone ))
    }

    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }
    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks ])
    }
    const tasksFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForTodolist} removeTask={removeTask} addTask={addTask} tasksFilter={tasksFilter}/>
        </div>
    );
}

export default App;

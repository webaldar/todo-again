import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let tasks1: TaskType[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
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

    const removeTask = (taskId: number) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }
    const tasksFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForTodolist} removeTask={removeTask} tasksFilter={tasksFilter}/>
        </div>
    );
}

export default App;

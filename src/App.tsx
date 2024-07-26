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
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}


function App() {
    const todolistID1 = v1()
    const todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    // let startTasks = {
    //     [todolistID1] : [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //     ],
    //     [todolistID2] : [
    //         {id: v1(), title: 'Bread', isDone: true},
    //         {id: v1(), title: 'Milk', isDone: false},
    //     ]
    // }
    //
    //
    // const [tasks, setTasks] = useState<TodolistType[]>(startTasks)
    const removeTodolist = (todolistID: string) => {
        const newTodolists = todolists.filter(todo => ( todo.id !== todolistID))
        setTodolists(newTodolists)
        delete tasks[todolistID]
    }
    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => (task.id !== taskId))})
        // const filteredTasks = tasks.filter(task => {
        //     return task.id !== taskId
        // })
        // setTasks(filteredTasks)
    }
    const addTask = (todolistID: string, title: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title, isDone: false}, ...tasks[todolistID]]})
        // setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
    const tasksFilter = (todolistID: string, filter: FilterType) => {
        setTodolists(todolists.map(todo => (todo.id === todolistID ? {...todo, filter} : todo)))
        // setFilter(filter)
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map(task => (task.id === taskID ? {...task, isDone} : task))
        })
        //setTasks(tasks.map(task => (task.id === taskID ? {...task, isDone} : task)))
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodolist = tasks[tl.id].filter(task => (!task.isDone))
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks[tl.id].filter(task => (task.isDone))
                }
                return (
                    <Todolist key={tl.id}
                              todolistID={tl.id}
                              title={tl.title}
                              tasks={tasksForTodolist}
                              removeTodolist={removeTodolist}
                              removeTask={removeTask}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              tasksFilter={tasksFilter}
                              filter={tl.filter}
                    />
                )

            })}

        </div>
    );
}

export default App;

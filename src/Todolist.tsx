import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    tasksFilter: (filter: FilterType) => void
}
export const Todolist = ({title, tasks, removeTask, addTask, tasksFilter}: TodolistPropsType) => {
    const [taskTitle, setTitle] = useState<string>('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        addTask(taskTitle)
        setTitle('')
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeTasksFilterHandler = (filter: FilterType) => {
        tasksFilter(filter)
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={onChangeHandler} onKeyUp={addTaskOnKeyUpHandler}/>
                <Button onclick={addTaskHandler} title={'+'}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ):(
                <ul>
                    {tasks.map(t => {
                        const removeTaskHandler = () => {
                            removeTask(t.id)
                        }

                            return (
                                <li key={t.id}>
                                    <input type="checkbox" checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <Button title={'x'} onclick={removeTaskHandler}/>
                                </li>
                            )
                        })}
                </ul>
            )}

            <div>
                <Button title={'All'} onclick={() => changeTasksFilterHandler('all')}/>
                <Button title={'Active'} onclick={()=> changeTasksFilterHandler('active')}/>
                <Button title={'Completed'} onclick={()=> changeTasksFilterHandler('completed')}/>
            </div>
        </div>
    );
}


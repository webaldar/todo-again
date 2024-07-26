import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todolistID: string) => void
    removeTask: (todolistID: string, taskId: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, taskStatus: boolean) => void
    tasksFilter: (todolistID: string, filter: FilterType) => void
    filter: FilterType
}
export const Todolist = ({todolistID, title, tasks, removeTodolist, removeTask, addTask, changeTaskStatus, tasksFilter, filter}: TodolistPropsType) => {
    const [taskTitle, setTitle] = useState<string>('')
    const [error, setError] = useState<null | string>(null)

    const removeTodolistHandler = () => {
        removeTodolist(todolistID)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(todolistID, taskTitle.trim())
            setTitle('')
        } else {
            setError('title is required')
        }
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeTasksFilterHandler = (todolistID: string, filter: FilterType) => {
        tasksFilter(todolistID, filter)
    }
    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3>{title}</h3>
                <Button title={'x'} onclick={removeTodolistHandler}/>
            </div>
            <div>
                <input className={error ? 'error' : ''} value={taskTitle} onChange={onChangeHandler}
                       onKeyUp={addTaskOnKeyUpHandler}/>
                <Button onclick={addTaskHandler} title={'+'}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(t => {
                        const removeTaskHandler = () => {
                            removeTask(todolistID, t.id)
                        }
                        const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            const newChekboxStatus = event.currentTarget.checked
                            changeTaskStatus(todolistID, t.id, newChekboxStatus)
                        }

                        return (
                            <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                                <span>{t.title}</span>
                                <Button title={'x'} onclick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onclick={() => changeTasksFilterHandler(todolistID, 'all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'} onclick={() => changeTasksFilterHandler(todolistID, 'active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'} onclick={() => changeTasksFilterHandler(todolistID, 'completed')}/>
            </div>
        </div>
    );
}


import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, taskStatus: boolean) => void
    tasksFilter: (filter: FilterType) => void
    filter: FilterType
}
export const Todolist = ({title, tasks, removeTask, addTask, changeTaskStatus, tasksFilter, filter}: TodolistPropsType) => {
    const [taskTitle, setTitle] = useState<string>('')
    const [error, setError] = useState<null | string>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(taskTitle.trim())
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
    const changeTasksFilterHandler = (filter: FilterType) => {
        tasksFilter(filter)
    }
    return (
        <div>
            <h3>{title}</h3>
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
                            removeTask(t.id)
                        }
                        const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            const newChekboxStatus = event.currentTarget.checked
                            changeTaskStatus(t.id, newChekboxStatus)
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
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onclick={() => changeTasksFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'} onclick={() => changeTasksFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'} onclick={() => changeTasksFilterHandler('completed')}/>
            </div>
        </div>
    );
}


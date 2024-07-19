import React from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    tasksFilter: (filter: FilterType) => void
}
export const Todolist = ({title, tasks, removeTask, tasksFilter}: TodolistPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ):(
                <ul>
                    {tasks.map(t => {

                            return (
                                <li key={t.id}>
                                    <input type="checkbox" checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <Button title={'x'} onclick={() => removeTask(t.id)}/>
                                </li>
                            )
                        })}
                </ul>
            )}

            <div>
                <Button title={'All'} onclick={() => tasksFilter('all')}/>
                <Button title={'Active'} onclick={()=> tasksFilter('active')}/>
                <Button title={'Completed'} onclick={()=> tasksFilter('completed')}/>
            </div>
        </div>
    );
}


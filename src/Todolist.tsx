import React from 'react';
import {TaskType} from "./App";
type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}
export const Todolist = ({title, tasks}: TodolistPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(t => {
                    return <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span></li>
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}


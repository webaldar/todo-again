import React from 'react';

type ButtonPropsType ={
    title: string
    callback?: () => void
}
export function Button({title, callback}: ButtonPropsType) {
    return (
        <button onClick={callback}>{title}</button>
    );
}


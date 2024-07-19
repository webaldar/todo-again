import React from 'react';

type ButtonPropsType ={
    title: string
    onclick?: () => void
}
export function Button({title, onclick}: ButtonPropsType) {
    return (
        <button onClick={onclick}>{title}</button>
    );
}


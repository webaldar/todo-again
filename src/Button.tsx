import React from 'react';

type ButtonPropsType ={
    title: string
    onclick?: () => void
    className?: string
}
export function Button({title, onclick, className}: ButtonPropsType) {
    return (
        <button className={className} onClick={onclick}>{title}</button>
    );
}


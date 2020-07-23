import React from 'react';
import Style from './Button.module.css'
const Button = (props)=>{
    let classList = [Style.Button,Style[props.colour]];
    return(
        <button className={classList.join(' ')} onClick={props.clicked}>{props.children}</button>
    )
}

export default Button;
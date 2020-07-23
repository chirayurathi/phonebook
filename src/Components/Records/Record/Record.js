import React from 'react'
import Style from './Record.module.css'
// import img from '../../../assets/download.jpg'

const Record = (props)=>{
    return(
        <div className={Style.Record}>
            <img src={props.img} alt="[PERSON]"></img>
            <div>
                <span className={Style.Name}>{props.name}</span>
                <span className={Style.Num1}> <i className="fas fa-phone-alt"></i> {props.number}</span>
                <span className={Style.Num2}> <i className="fas fa-tty"></i> {props.altnumber}</span>
                <span className={Style.Mail}> <i className="fas fa-at"></i> {props.email}</span>
            </div>
            <div className={Style.Functions}>
            <i onClick={props.modifyHandler} className={["fas fa-pencil-alt",Style.mod].join(' ')}></i>
            <i onClick={props.deleteHandler} className={["fas fa-trash",Style.del].join(' ')}></i>
            </div>
        </div>
    )
}

export default Record;
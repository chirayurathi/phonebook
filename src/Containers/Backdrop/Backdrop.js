import React from 'react'
import Styles from './Backdrop.module.css'

const Backdrop =(props)=>(
    <div onClick={props.clicked} className={Styles.Backdrop}></div>
)

export default Backdrop;
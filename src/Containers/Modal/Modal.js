import React, { Fragment } from 'react';
import Backdrop from '../Backdrop/Backdrop'
import Style from './Modal.module.css'

const Modal = (props)=>{
    return(
        <Fragment>
            <Backdrop clicked={props.backClicked} />
            <div className={Style.Modal}>{props.children}</div>
        </Fragment>
    )
}

export default Modal;
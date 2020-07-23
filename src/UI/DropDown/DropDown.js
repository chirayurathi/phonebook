import React from 'react';
import Style from './DropDown.module.css';

const DropDown = (props)=>{
    return(
        <div className={Style.DropDown}>
            <button><i className="fas fa-sort-down"></i>{!props.mob?<span>sort by</span>:null}</button>
            <ul>
                {/* <li onClick={()=>{props.sortHandler("nil")}}>new</li> */}
                <li onClick={()=>{props.sortHandler("name")}}>Name</li>
                <li onClick={()=>{props.sortHandler("email")}}>Email</li>
            </ul>
        </div>
    )
}

export default DropDown;
import React,{Component} from 'react';
import Record from './Record/Record'
import axios from 'axios'
import Style from './Records.module.css'
class Records extends Component{
    render(){
        return(
            <div className={Style.Records}>
                {this.props.loading?null:this.props.records.map(record=>{
                    if(record.name.includes(this.props.find) || record.number.includes(this.props.find) || record.altnumber.includes(this.props.find) || record.email.includes(this.props.find))
                    {
                        return(
                            <Record {...record} 
                            modifyHandler={()=>{this.props.modifyHandler(record)}}
                            deleteHandler={()=>{this.props.deleteHandler(record.key)}} />
                        )
                    }
                    else{
                        return(null);
                    }

                })}
                
            </div>
        )
    }
}

export default Records;
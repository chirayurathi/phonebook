import React, { Component, Fragment } from 'react';
import Style from './InputForm.module.css';
import Button from '../../UI/Button/Button';
import Mimg from '../../assets/download.jpg';
import axios from 'axios';
import firebase from '../../firebase';
import Spinner  from '../../UI/Spinner/Spinner';

class InputForm extends Component{
    state = {
        form:{
            img:'gs://phonebook-6ade9.appspot.com/download.jpg',
            name:'',
            number:'',
            altnumber:'',
            email:'',
            imgId:''
        },
        tempImg:null,
        loading:false
    }
    changeHandler = (event, type)=>{
        let stateFormCopy = {...this.state.form};
        if(type==="img"){
            this.setState({tempImg:event.target.files[0]});
        }
        else{
            
            stateFormCopy[type] = event.target.value;
            
        }
        this.setState({form:stateFormCopy})
    }
     uuidv4 = ()=>{
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
    submit = ()=>{
        this.setState({loading:true});
        if(this.props.type==="create"){
            let dest = this.uuidv4()
            let storageRef = firebase.storage().ref()
            storageRef.child(`/${dest}.jpg`).put(this.state.tempImg)
            .then((res)=>{
                storageRef.child(`/${dest}.jpg`).getDownloadURL().then((url)=>{
                    let copy = {...this.state.form}
                    copy.img = url;
                    copy.imgId = dest;
                    this.setState({form:copy})
                    axios.post('https://phonebook-6ade9.firebaseio.com/records.json',this.state.form)
                    .then((res)=>{
                this.setState({loading:false})
                this.props.closeModal();
                this.props.rerender();
            })
                })
            })
            
        }
        else{
            if(this.state.tempImg !==null){
                let storageRef = firebase.storage().ref()
                storageRef.child(`/${this.state.form.imgId}.jpg`).put(this.state.tempImg)
                .then((res)=>{
                    axios.put('https://phonebook-6ade9.firebaseio.com/records/'+this.state.form.key+'.json/',{
                        img:this.state.form.img,
                        name:this.state.form.name,
                        number:this.state.form.number,
                        altnumber:this.state.form.altnumber,
                        email:this.state.form.email,
                        imgId:this.state.form.imgId
                    })
                    .then((res)=>{
                        this.setState({loading:false})
                        this.props.closeModal();
                        this.props.rerender();
                    })
           })
        } 
        else{
                axios.put('https://phonebook-6ade9.firebaseio.com/records/'+this.state.form.key+'.json/',{
                    img:'gs://phonebook-6ade9.appspot.com/download.jpg',
                    name:this.state.form.name,
                    number:this.state.form.number,
                    altnumber:this.state.form.altnumber,
                    email:this.state.form.email,
                    imgId:this.state.form.imgId,
                    img:this.state.form.img
                })            
                .then((res)=>{
                    this.setState({loading:false})
                    this.props.closeModal();
                    this.props.rerender();
                })
           }
       }
    }
    componentDidMount(){
        if(this.props.type === "modify"){
            console.log({...this.props.record})
            this.setState({form:{...this.props.record}});
            console.log(this.state.form)
        }
    }
    render(){
        let Subbutton = (<Button colour="green-submit" clicked={this.submit}> <i className="fas fa-plus"></i> create</Button>);
        if(this.props.type==="modify"){
            Subbutton = (<Button colour="yellow" clicked={this.submit}> <i className="fas fa-pencil-alt"></i> Modify</Button>)
        }
        return(
            <Fragment>
            {this.state.loading?<div className={Style.Spinner}><Spinner/></div>:
                <div className={Style.InputForm}>
                <div>
                    <label htmlFor ="img"><img src={Mimg} alt="select image"/></label>
                    <input onChange={(event)=>{this.changeHandler(event,"img")}} type="file" name="img" accept="image/*" />
                </div>
                <div>
                    <label htmlFor="name"><i className="fas fa-user"></i>: </label>
                    <input onChange={(event)=>{this.changeHandler(event,"name")}} placeholder="Name" type="text" name="name" value={this.state.form.name} />
                </div>
                <div>
                    <label htmlFor="number"><i className="fas fa-phone-alt"/>: </label>
                    <input onChange={(event)=>{this.changeHandler(event,"number")}}  placeholder="Contact number" type="number" name="number" value={this.state.form.number} />    
                </div>
                <div>
                    <label htmlFor="altnumber"><i className="fas fa-tty"/>: </label>
                    <input onChange={(event)=>{this.changeHandler(event,"altnumber")}} placeholder="alternative number" type="number" name="altnumber" value={this.state.form.altnumber} />
                </div>
                <div>
                    <label htmlFor="email"><i className="fas fa-at"/>: </label>
                    <input onChange={(event)=>{this.changeHandler(event,"email")}} type="email" placeholder="Email" name="email" value={this.state.form.email} />
                </div>
                <div className={Style.Submit}>
                    {Subbutton}
                </div>
            </div>
            }
        </Fragment>
        )
    }
}

export default InputForm;
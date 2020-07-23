import React, { Component } from 'react';
import Style from './Navbar.module.css';
import Button from '../../UI/Button/Button';
import DropDown from '../../UI/DropDown/DropDown';
import Modal from '../../Containers/Modal/Modal';
import InputForm from '../InputForm/InputForm';

class Navbar extends Component{
    state = {
        showCreate:false,
        Mobview:false,
        scroll:[Style.Navbar]
    }
    showCreateHandler = ()=>{
        this.setState({showCreate:!this.state.showCreate})
    }
    widthCheck = (x)=>{
        if(x>800){
            this.setState({Mobview:false})
        }
        else{
            this.setState({Mobview:true})
        }
    }
    onresize = ()=>{
        window.addEventListener("resize",()=>{
            this.widthCheck(window.innerWidth);
        })
    }

    componentDidMount(){
        this.widthCheck(window.innerWidth);
        this.onresize();
        window.addEventListener("scroll",()=>{
            if (window.scrollY>50){
                this.setState({scroll:[Style.Navbar,Style.NavScr]})
            }
            else{
                this.setState({scroll:[Style.Navbar]})
            }
        })
    }
    render(){
        return(
            <div className={this.state.scroll.join(' ')}>
                {this.state.showCreate?<Modal backClicked={this.showCreateHandler}><InputForm type="create" rerender={this.props.rerender} closeModal={this.showCreateHandler}/></Modal>:null}
                <h3><i className="fas fa-book"></i>Phonebook</h3>
                <div>
                    <div className={Style.Search}>
                        <i className="fas fa-search"></i>
                        <input onChange={this.props.searchHandler} value={this.props.search} placeholder="search" type="text" />
                        {/* <hr/> */}
                    </div>
                    <DropDown mob={this.state.Mobview} sortHandler={(ele)=>{this.props.sortHandler(ele)}}/>
                    <Button colour="green" clicked={this.showCreateHandler}> <i className="fas fa-plus"></i>{!this.state.Mobview?<span>create</span>:null}</Button>
                </div>
                {
                //sort

                }
            </div>
        )
    }
}

export default Navbar;
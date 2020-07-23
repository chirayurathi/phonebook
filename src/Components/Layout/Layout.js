import React,{Component} from 'react';
import Navbar from '../Navbar/Navbar';
import Records from '../Records/Records';
import axios from 'axios';
import Modal from '../../Containers/Modal/Modal';
import InputForm from '../InputForm/InputForm';
import Spinner from '../../UI/Spinner/Spinner'
import Style from './Layout.module.css'
class Layout extends Component{
    state = {
        records:null,
        loading:true,
        modifier:false,
        form:{
            img:'gs://phonebook-6ade9.appspot.com/download.jpg',
            name:'',
            number:'',
            altnumber:'',
            email:'',
            key:''
        },
        search:"",
        sort:"name"
    }
    getData = ()=>{
        this.setState({loading:true});
        axios.get('https://phonebook-6ade9.firebaseio.com/records.json')
        .then((res)=>{
            let records = []
            for(let i in res.data){
                let k = res.data[i]
                k.key = i;
                records.push(k)
            }
            this.sortHandler(this.state.sort,records);
            this.setState({loading:false})
            
        })
    }
    searchHandler = (event)=>{
        this.setState({search:event.target.value});
    }
    modifyHandler = (record)=>{
        if(this.state.modifier===false){

            this.setState({modifier:true,form:{...record}});

        }
        else{
            this.setState({modifier:false})
        }
        

     }
    deleteHandler = (key)=>{
        axios.delete('https://phonebook-6ade9.firebaseio.com/records/'+key+'.json/')
        .then((res)=>{
            console.log(res);
            this.getData()
        })
    }
    componentDidMount(){
        this.getData();
    }
    sortHandler = (ele,items)=>{
        console.log(ele)
        // var items = [5,3,7,6,2,9];
function swap(items, left, right){
    var temp = items[left];
    items[left] = items[right];
    items[right] = temp;
}
function partition(x, left, right) {
    var pivot   = x[Math.floor((right + left) / 2)], 
        i       = left, 
        j       = right; 
    while (i <= j) {
        while (x[i][ele] < pivot[ele]) {
            i++;
        }
        while (x[j][ele] > pivot[ele]) {
            j--;
        }
        if (i <= j) {
            swap(x, i, j); 
            i++;
            j--;
        }
    }
    return i;
}

function sort(x, left, right) {
    var index;
    if (x.length > 1) {
        index = partition(x, left, right);
        if (left < index - 1) { 
            sort(x, left, index - 1);
        }
        if (index < right) {
            sort(x, index, right);
        }
    }
    return x;
}
var sortedrecords = sort(items, 0, items.length - 1);
this.setState({records:sortedrecords})
}


    render(){
        return(
            <div className={Style.Layout}>
                {this.state.modifier?<Modal backClicked={this.modifyHandler}><InputForm rerender={this.getData} type="modify" record={this.state.form} closeModal={this.modifyHandler}/></Modal>:null}
                <Navbar sortHandler={(ele)=>{this.sortHandler(ele,this.state.records)}} rerender = {this.getData} search={this.state.search} searchHandler={this.searchHandler}/>
                {this.state.loading?<Spinner/>:<Records {...this.state} find={this.state.search} modifyHandler={(record)=>{this.modifyHandler(record)}} deleteHandler={(key)=>{this.deleteHandler(key)}}/>}
            </div>
        );
    }
}

export default Layout;
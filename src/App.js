import React,{Component} from 'react';
import './App.css';

import Header from "./components/common/Header";
import Contacts from "./components/contactinfo/Contacts";

// function App() {
export default class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      search:""
    }
  }
  searchCapture = (event) => {
    this.setState({search:event.target.value});
  }
  render(){
    const {search} = this.state;
    return (
      <div className="App">
        <Header captureValue={(e)=>{this.searchCapture(e)}}/>
        <Contacts searchValue={search}/>
      </div>
    );
  }
}  

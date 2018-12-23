import React, { Component } from 'react';
import IntegrantesList from './IntegranteList'
import Results from './Results'
import Splitter from './Splitter'
import AddUsersInput from './AddUsersInput'
import * as firebase from 'firebase'
import './App.css';

var config = {
  apiKey: "AIzaSyCAp2hA2XlHcmKDRzuq_dqcgJjYgP2_M3g",
  authDomain: "dbtest-9d29f.firebaseapp.com",
  databaseURL: "https://dbtest-9d29f.firebaseio.com",
  projectId: "dbtest-9d29f",
  storageBucket: "",
  messagingSenderId: "519158224798"
};
firebase.initializeApp(config);

const dbFirebase = firebase.database().ref('userData')
const userListRef=dbFirebase.child('userList')

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      integrantes:[],
      showInput:true,
      showSplitter:false
    }

    this.adduser = this.addUser.bind(this)
    this.removeUser = this.removeUser.bind(this)
    this.removeInput = this.removeInput.bind(this)
    /*this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseBanner = this.handleCloseBanner.bind(this);
    this.removeMember = this.removeMember.bind(this)
    this.handleFinish =  this.handleFinish.bind(this)
    this.handleRuletaRusa = this.handleRuletaRusa.bind(this)*/
  }
  


 
  
  componentDidMount(){
    var self = this;

    console.log("member list "+JSON.stringify(this.state.memberList)+" Split Menu "+JSON.stringify(this.state.splitMenu))

    userListRef.on("value",(snapshot)=>{
      let newState=[]
      const userList = snapshot.val()
      const userId = snapshot.key
     console.log("valores: "+JSON.stringify(userList))
    
     for(let user in userList){

      newState.push({
          id : user,
          userName :userList[user].userName,
          userBudget:userList[user].userBudget,
          sorteado : false
      
      })

     /*       
      console.log("ITEM  /////"+user+"  ///////"+JSON.stringify(userList))
      newState.push({

        id : userList[user].id,
        userName :userList[user].userName,
        userBudget:userList[user].userBudget,
        sorteado : false
    
    })
    */
  }

  console.log("Newstate = "+JSON.stringify(newState))
  console.log("ESTADO = "+JSON.stringify(this.state.integrantes))
  this.setState({
    integrantes:newState
  })
      
    })


  
    

    
  }
  
  
     
  addUser(newUser){
    
    userListRef.push(newUser)
  
  }

  removeInput(){
    console.log("REMOVEEE INPUT")
    this.setState({
      showInput:false,
      showSplitter:true
    })
  }

  removeUser(key){

    const integrantes = this.state.integrantes.filter(item=>{
      return item.id !== key
    })

    userListRef.set(integrantes);

  }
    



  



  
  render() {
    
    return (
      <div className="App">
      <header className="App-header">
        <h1>ASAFALO 1.0</h1>
        <h6>Una forma divertida de dividir gastos</h6>
      </header>
          <IntegrantesList removeUser={this.removeUser} membersList={this.state.integrantes} />
          <AddUsersInput displayState={this.state.showInput} addUser={this.adduser} removeInput={this.removeInput} className={this.state.showInput ? null : "hide"}/>
          <Splitter displaySplitter={this.state.showSplitter}/>
     
      
      
    
      </div>
    );
  }
}



  
  


export default App;

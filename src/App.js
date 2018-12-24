import React, { Component } from 'react';
import IntegrantesList from './IntegranteList'
import RenderWinner from './RenderWinner'
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
      winner:null,
      showInput:true,
      showSplitter:false,
      showRenderWinner:false,
      showIntegrantesList:true

    }

    this.adduser = this.addUser.bind(this)
    this.removeUser = this.removeUser.bind(this)
    this.removeInput = this.removeInput.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
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
      }

  /* CHECK
  console.log("Newstate = "+JSON.stringify(newState))
  console.log("ESTADO = "+JSON.stringify(this.state.integrantes))
  */
      this.setState({
        integrantes:newState
      })  
    })

  }
  
  
     
  addUser(newUser){
    
    userListRef.push(newUser)
  
  }

  removeInput(){
    

    /*Armo la lista de pibes, saco los montos que puso cada uno y sumo todo para armar el total*/    
    const listaPibes = this.state.integrantes
    const amount = listaPibes.map(item=>{
      return parseInt(item.userBudget)
    })

    const getTotalAmount = amount.reduce((acc,val)=>{
      return  acc + val
    },0)


    /*Calculo el 70% que va a pagar el ganador de ruleta rusa*/ 
    const ruletaRusaAmount = Math.round(0.7*getTotalAmount); 

    console.log("el 70% esl: ",ruletaRusaAmount)

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



  handleSelection(selection){
    console.log("handle selection")


    /*Ruleta rusa*/
    const userList = this.state.integrantes
    const userListLength = userList.length
    const selected = Math.floor(Math.random() * userListLength)
    const winner = userList[selected]

    /*Saco los montos que puso cada uno y sumo todo para armar el total*/    
    const amount = userList.map(item=>{
      return parseInt(item.userBudget)
    })

    const getTotalAmount = amount.reduce((acc,val)=>{
      return  acc + val
    },0)


    /*Calculo el 70% que va a pagar el ganador de ruleta rusa*/ 
    const ruletaRusaAmount = Math.round(0.7*getTotalAmount); 

    console.log("el 70% esl: ",ruletaRusaAmount)

  /*fin*/
  


    this.setState({ 
      winner: {
        name:winner.userName,
        amount2Pay:ruletaRusaAmount
      },
      showIntegrantesList:false,
      showRenderWinner:true
     }, () => 
    console.log(this.state.winner.userName," ",this.state.showIntegrantesList));
  }
    



  



  
  render() {
    
    return (
      <div className="App">
      <header className="App-header">
        <h1>ASAFALO 1.0</h1>
        <h6>Una forma divertida de dividir gastos</h6>
      </header>
          <IntegrantesList showIntegrantesList={this.state.showIntegrantesList} removeUser={this.removeUser} membersList={this.state.integrantes} />
          <RenderWinner showRenderWinner={this.state.showRenderWinner} winner={this.state.winner}/>
          <AddUsersInput displayState={this.state.showInput} addUser={this.adduser} removeInput={this.removeInput} className={this.state.showInput ? null : "hide"}/>
          <Splitter displaySplitter={this.state.showSplitter} selectedValue={this.handleSelection} />
      </div>
    );
  }
}



  
  


export default App;

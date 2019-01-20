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
      showIntegrantesList:false,
      showResetBtn:false
      

    }

    this.adduser = this.addUser.bind(this)
    this.removeUser = this.removeUser.bind(this)
    this.removeInput = this.removeInput.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
    this.reinitializeApp = this.reinitializeApp.bind(this)
    this.returnToHome = this.returnToHome.bind(this)
  }
  


 
  
  componentDidMount(){

    var self = this;

  //console.log("member list "+JSON.stringify(this.state.memberList)+" Split Menu "+JSON.stringify(this.state.splitMenu))

    userListRef.on("value",async (snapshot)=>{
      let newState=[]
      const userList = snapshot.val()
      const userId = snapshot.key
      console.log("valores: "+JSON.stringify(userList))
    
      for(let user in userList){
        console.log("USER :"+user," USERLIST: ",userList)
        try{
          
          newState.push({
            id : userList[user].id,
            imgUrl:userList[user].imgUrl,
            userName :userList[user].userName,
            userBudget:userList[user].userBudget,
            sorteado : false,
          })

        }catch (err){
          console.log("error: ",err)
        }
      
      }    this.setState({
        integrantes:newState,
        showIntegrantesList:true,
        
      },console.log("ESTADO USUARIOS",this.state.integrantes)) 

   
    })

  }
  
  componentWillUnmount(){
    this.setState({
      isLoading:true
    })
  }
     
  addUser(newUser){

    console.log("UsUARIO A AGREGAR: ",newUser)
    if(newUser.hasOwnProperty("userName") && newUser.hasOwnProperty("userBudget")){
      

      this.setState({
        showIntegrantesList:true
      })
      userListRef.push(newUser)
      
    }else{
      return(
        <div>
          <h6>Falta ingresar El nombre o el dinergo que gastó, vuelva a intentarlo completando todos los datos</h6>
        </div>
        )
      }
    
    
  
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
console.log("usuario a borrar",key)
    const integrantes = this.state.integrantes.filter(item=>{
      
      return item.id !== key
    })

    userListRef.set(integrantes);

  }

  reinitializeApp(){
    console.log("reiniciaste!")
    this.setState({
      showIntegrantesList:false
    })

    //Borro todos los datos de la DB
    userListRef.remove();

    this.setState({
      showIntegrantesList:true,
      showInput:true,
      showSplitter:false,
      showRenderWinner:false,
      showIntegrantesList:false,
      showResetBtn:false

    })
  }


  returnToHome(){
      this.setState({
        integrantes:this.state.integrantes,
        showInput:true,
        showSplitter:false,
        showRenderWinner:false,
        showIntegrantesList:true,
        showResetBtn:false
      })
  }
  
    
  



  handleSelection(selection){
    console.log("handle selection :",selection)
    
    const userList = this.state.integrantes
    const userListLength = userList.length
    const selected = Math.floor(Math.random() * userListLength)
    const winner = userList[selected]

    /*Saco los montos que puso cada uno y sumo todo para armar el total*/   
    const amount = userList.map(item=>{
      return parseInt(item.userBudget)
    })

    /*Calculo el 70% que va a pagar el ganador de ruleta rusa*/ 
    const getTotalAmount = amount.reduce((acc,val)=>{
      return  acc + val
    },0)


    const ruletaRusa = () => {
 
      const ruletaRusaAmount = Math.round(0.7*getTotalAmount); 

      console.log("el 70% esl: ",ruletaRusaAmount)

      return this.setState({ 
        winner: {
          name:winner.userName,
          amount2Pay:ruletaRusaAmount,
          resultType:"RuletaRusa",
          imgUrl:winner.imgUrl

          
        },
          showIntegrantesList:false,
          showRenderWinner:true,
          showSplitter:false,
          showResetBtn:true
        }, () => 
        console.log(this.state.winner.userName," ",this.state.showIntegrantesList));
    }

//Haciendo la funcion bondi
  const bondi = ()=>{
    

    const userList = this.state.integrantes
    const userListLength = userList.length

   
       //Dos personas comparten el 60% del gasto
    const selectRamdomTwo = (userList,userListLength)=>{
      
        const numOne = Math.floor(Math.random() * userListLength);
        const filteredUserList = userList.map((item,index)=>{
          if(index!==numOne){
            return item
          }else{
            return null
          }
        })

        if(userListLength>2){


        const numTwo = Math.floor(Math.random() * selectRamdomTwo.length)
        console.log("numTwo = "+JSON.stringify(numTwo))
        console.log("winners pay"+getTotalAmount)

        const winnersPay = Math.round(0.6*getTotalAmount); 
       
      return this.setState({
        winner: {
          winnerOne:userList[numOne].userName,
          secondWinner:userList[numTwo].userName,
          debt:winnersPay/2,
          resultType:"Bondi",
          
          
            },
          showIntegrantesList:false,
          showRenderWinner:true,
          showSplitter:false,
          showResetBtn:true
          })
        }else{
          
          
            {
              this.setState({
                errorOn:{
                  message:"No ingresaste la cantidad minima de participantes para usar este boton",

                  },
                  showIntegrantesList:false,
                  showRenderWinner:true,
                  showSplitter:false,
                  showResetBtn:true

                },()=>{console.log("No ingresaste la cantidad minima de participantes para usar este boton")})
            }
        }

        
      
   

      


      }
    
   
    

    
   
    const bondiWinner = selectRamdomTwo(userList,userListLength)
   

  }
  
const todosPorIgual =()=>{
const debt = parseInt(getTotalAmount/userListLength);

return this.setState({
  winner: {
    amount2Pay:debt,
      },
    showIntegrantesList:false,
    showRenderWinner:true,
    showSplitter:false,
    showResetBtn:true
    })




 
}   

switch(selection){
  case 'ruletaRusa':
  return ruletaRusa()
  break
  case 'bondi':
  return bondi()
  break
  case "todosPorIgual":
  return todosPorIgual()
  break

}

  
  }


    
    



  



  
  render() {
    
    return (
      <div className="App">
      <header className="App-header">
        <h1>ASAFALO 1.0</h1>
        <h6>Una forma divertida de dividir gastos</h6>
      </header>
          
          {this.state.showIntegrantesList ? <IntegrantesList showIntegrantesList={this.state.showIntegrantesList} removeUser={this.removeUser} membersList={this.state.integrantes} />:null}
          {this.state.showRenderWinner ? <RenderWinner showRenderWinner={this.state.showRenderWinner}  error={this.state.errorOn} winner={this.state.winner} returHome={this.returnToHome}/>:null}
          {this.state.showInput ? <AddUsersInput displayState={this.state.showInput} addUser={this.adduser} removeInput={this.removeInput} className={this.state.showInput ? null : "hide"}/>:null}
          {this.state.showSplitter ? <Splitter displaySplitter={this.state.showSplitter} selectedValue={this.handleSelection} />:null}
          {this.state.showResetBtn ? <ResetBtn reset={this.reinitializeApp}/> : null}
      </div>
    );
  }
}

const ResetBtn = (props)=>{

  function restart(){
    console.log("ADENTRO RESTARTEO")
  }

  return(
    <div>
    <button className="restartBtn" onClick={props.reset}>RESTART  !</button>
    </div>
  )
}



  
  


export default App;

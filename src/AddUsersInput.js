import React from 'react'

class AddUsersInput extends React.Component{
    constructor(props){
        super(props)

        this.state={
            welcomeBanner:{
                show:false
            },
            finishBtn:{
                show:false
            },

        newUserData:{
            id : new Date().valueOf(),
            urlImg:"",
            userName :"",
            userBudget:"",
            sorteado : false

        }
    }
    
    this.handleCloseBanner=this.handleCloseBanner.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    
    }

componentDidMount(){
    this.setState({
        welcomeBanner:{
            show:true}
    })


}

    handleCloseBanner(){
        this.setState({
          welcomeBanner:{
            show:false,
          }
        }) 
    }

    handleName(name){
        this.setState({
            newUserData:{
                userName:name.target.value
            }
        })
    }

    handleBudget(value){

        this.setState({
            newUserData:{
                userBudget:value.target.value
            }
        })
    }
    

      handleSubmit(event){
        event.preventDefault();
        
        console.log("ENTRO ÑERI "+event.target.elements.userNameInput.value)
        this.setState({
            newUserData:{
                userName :event.target.elements.userNameInput.value,
                userBudget:event.target.elements.userBudgetInput.value,
                
                }
            
        })
        
        const getURL = async (usrBudget,usrName)=>{
        
            const urlCall = await fetch('https://api.thecatapi.com/v1/images/search')
            const response = await urlCall.json()
            const reponseOk = response[0].url
            return reponseOk
            
            
            
            }

        const completeUser = getURL().then((reponseOk)=>{
            console.log("LA URL: ",reponseOk)
            this.setState({
                newUserData:{
                    id:new Date().valueOf(),
                    imgUrl:reponseOk,
                    userName:this.state.newUserData.userName,
                    userBudget: this.state.newUserData.userBudget,
                    sorteado:false
                    
                }})
            
            
               
            
                
            })

            completeUser.then(()=>{
                console.log("USUARIO A ENViAR: ",this.state.newUserData)
                const usuarioe=this.state.newUserData
                this.props.addUser(usuarioe)
            })
        
        
    

        

       

        
        
        
        


       

        this.setState({
            finishBtn:{
              show:true
            }
           
          })
    
    
       
      
    

    
      this.handleCloseBanner();
      
     
     
      }

    render(){
        return(
       <div className="inputContainer">{this.props.displayState ?      <div>
        <WelcomeMessage show={this.state.welcomeBanner.show}/>
        <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleName.bind(this)} name="userNameInput"ref={userNameInput => this.element = userNameInput} placeholder="Nombre?" />
            <input type="text" onChange={this.handleBudget.bind(this)} name="userBudgetInput" ref={userBudget => this.element =userBudget} placeholder="Cuanto Pusiste?"/>
            <button type="submit" className="addMemberBtn">Agregar!</button>
            {this.state.finishBtn.show ? (
            <button onClick={this.props.removeInput} className="finishBtn">Finish!</button>
            ):null} 
        </form>
    </div>:null}</div>
        )
    }
}

const WelcomeMessage = (props)=>{
    
        if(props.show){
            return(
                <div className="bannerContainer">
                    <div>
                    <h5>Ingresa los nombres de las personas que morfaron y cuanto gastó cada uno</h5>
                    <img src="http://www.animatedimages.org/data/media/111/animated-arrow-image-0269.gif"/>
                    </div>
                </div>
                )   
            }
            {
                return null
            }
        
    
}



export default AddUsersInput
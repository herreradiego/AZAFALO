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

        },
        invalidData:false
        
    }
    
    this.handleCloseBanner=this.handleCloseBanner.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBudget = this.handleBudget.bind(this)
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

    handleBudget(event){
        
        const budget = event.target.value ? isFinite(event.target.value) : null
        const eventValue = event.target.value
        const exp = new RegExp("^[0-9]*$");
        
        if(exp.test(eventValue)){
            this.setState({
                newUserData:{
                    userBudget:event.target.value,
                },
                invalidData:false
            })
        }else{
            this.setState({
                invalidData:true
            })
            console.log("LETRA")
        }
    
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
        <form onSubmit={this.handleSubmit} autocomplete="off">
            <input type="text" onChange={this.handleName.bind(this)} name="userNameInput"ref={userNameInput => this.element = userNameInput} placeholder="Nombre?" required/>
            {this.state.invalidData ? <Invalid className="errorMessage"/>: null}
            <input type="text"   maxlength="4" onChange={(event)=>{this.handleBudget(event)}} name="userBudgetInput" ref={userBudget => this.element =userBudget} placeholder="Cuanto Pusiste?" required/>
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

const Invalid = ()=>{
    return(
        <React.Fragment>Por favor ingresa solamente numeros en este campo. Gracias!</React.Fragment>
    )
}



export default AddUsersInput
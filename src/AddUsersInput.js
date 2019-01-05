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

      handleSubmit(event){
        event.preventDefault();
        const newUser = {
          id : new Date().valueOf(),
            userName : event.target.elements.userNameInput.value,
            userBudget:event.target.elements.userBudgetInput.value,
            sorteado : false
        }

        this.setState({
            finishBtn:{
              show:true
            }
           
          })
    
    
       this.props.addUser(newUser)
      
    

    
      this.handleCloseBanner();
      
     
     
      }

    render(){
        return(
       <div className="inputContainer">{this.props.displayState ?      <div>
        <WelcomeMessage show={this.state.welcomeBanner.show}/>
        <form onSubmit={this.handleSubmit}>
            <h5>AGREGAR INTEGRANDOS DEL ASADO:</h5>
            <input type="text" name="userNameInput"ref={userNameInput => this.element = userNameInput} placeholder="Nombre?" /><br/>
            <input type="text" name="userBudgetInput" ref={userBudget => this.element =userBudget} placeholder="Cuanto Pusiste?"/>
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
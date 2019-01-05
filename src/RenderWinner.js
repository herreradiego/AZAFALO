import React from 'react'

class RenderWinner extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLoading:setTimeout(() => {
                this.setState({
                    isLoading: false
              })
            }, 2000)
        }

        //this.delayState = this.delayState.bind(this)
    }




    render(){
        
        console.log("from RENDER WINNDER" + this.state.showRenderWinner)
        return(
            <div className="winnerBanner">
               
                    
                    {this.state.isLoading ? <img src={"https://i.imgur.com/seuaOqf.gif?1"}/> : 
                    <h5><b>{this.props.winner.name}</b>, estas hastas las manos... fuiste victima de la Ruleta Rusa 
                    y tenes que poner: ${this.props.winner.amount2Pay}</h5>}
                         
            </div>
            )
    }
}


export default RenderWinner 
import React from 'react'

class RenderWinner extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLoading:true
        }
        this.delayState = this.delayState.bind(this)
    }

    

    componentDidMount(){
       
        this.delayState()

       
    }

    delayState() {
        setTimeout(() => {
            this.setState({
            isLoading: false
          })
        }, 9999);
    }

    render(){
        console.log("from RENDER WINNDER" + this.state.showRenderWinner)
        return(
            <div>
                {this.props.showRenderWinner ? <div>
                    
                    {this.state.isLoading ? <img src={"https://i.imgur.com/seuaOqf.gif?1"}/> : <h2>El winner is {this.props.winner.userName}</h2>}
                     
                    
                </div>
                :null }
            </div>
                
        )
    }
}


export default RenderWinner 
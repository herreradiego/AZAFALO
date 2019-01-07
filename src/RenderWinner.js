import React from 'react'

class RenderWinner extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLoading:setTimeout(() => {
                this.setState({
                    isLoading: false
              })
            }, 2000),
            winnerType:null,
            
        }

        //this.delayState = this.delayState.bind(this)
        
    }



    renderResult(resultType){
 console.log("result type: ",resultType)
        if(resultType=="RuletaRusa"){
            console.log("ENTRO A RULETA VIEJA")
            return(
                        <div className="winnerBanner">   
                        {this.state.isLoading ? <img src={"https://i.imgur.com/seuaOqf.gif?1"}/> : 
                        <h5><b>{this.props.winner.name}</b>, estas hastas las manos... fuiste victima de la Ruleta Rusa 
                        y tenes que poner: ${this.props.winner.amount2Pay}</h5>}     
                        </div>
                    )
        }
        else if (resultType=="Bondi") {
             console.log("ENTRO A BONDIII")
            return(
                    <div className="winnerBanner">   
                        {this.state.isLoading ? <img src={"https://i.imgur.com/seuaOqf.gif?1"}/> : 
                        <h5>Les tocó... {this.props.winner.winnerOne} y {this.props.winner.secondWinner} tienen que gatillar: ${this.props.winner.amount2Pay} entre los dos</h5>}          
                    </div>
                    )
                    
                } 
                else {

                    return (<div className="winnerBanner">   
                    {this.state.isLoading ? <img src={"https://i.imgur.com/seuaOqf.gif?1"}/> : 
                    <h5><b>{this.props.winner.name}</b>Buena onda, sin presiones... todos garparola... cada uno paga: ${this.props.winner.amount2Pay}</h5>}          
                    </div>
                    )
                }

            }
        
    


    render(){
        const winnerData = this.props.winner
        const resultType = winnerData.resultType
        
        return(this.renderResult(resultType))
       
      
}
}


export default RenderWinner 
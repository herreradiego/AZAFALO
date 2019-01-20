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

        this.handleReturn = this.handleReturn.bind(this)
        
    }

    handleReturn(){
        console.log("ANDA")
        this.props.returHome()
      
    }


    renderResult(resultType,winnerData){
        console.log("result type: ",resultType)
        if(resultType=="RuletaRusa"){
            console.log("ENTRO A RULETA VIEJA")
            return(
                        <div className="winnerBanner" key={winnerData.id}>  
                        
                        {this.state.isLoading ? <img src={"https://i.imgur.com/seuaOqf.gif?1"}/> : <div>
                        <img className="looserPicRl"src="https://media.giphy.com/media/9c2fd92eNOekM/giphy.gif"/> 
                        <h6 className="winnerText"><b>{this.props.winner.name}</b>, estas hastas las manos... fuiste victima de la Ruleta Rusa 
                        y tenes que poner: <span className="budget">${this.props.winner.amount2Pay}</span></h6></div>}     
                        </div>
                    )
        }
        else if (resultType=="Bondi") {
             console.log("ENTRO A BONDIII")
            return(
                    <div className="winnerBanner">   
                        {this.state.isLoading ? <img src={"https://i.imgur.com/seuaOqf.gif?1"}/> :
                
                        <React.Fragment className="winnerBanner">
                            <img className={"looserPicRl"} src={"https://i.pinimg.com/736x/1d/83/e0/1d83e0f607b7b1de607fff558a573b6c--cat-smile-smile-smile.jpg"}/> 
                            <h5  className="winnerText" >Y bue hay cosas peores en la vida... 
                            pobres...{this.props.winner.winnerOne} y {this.props.winner.secondWinner} tienen que gatillar: 
                            <span className="budget"> ${this.props.winner.debt}</span> entre los dos</h5>
                        </React.Fragment>
                            }          
                        </div>
                    
            )
                    
                } 
                else {

                    return (
                    <div className="winnerBanner">   
                        {this.state.isLoading ? <img src={"https://i.imgur.com/seuaOqf.gif?1"}/> :
                            <React.Fragment>
                                <img className={"looserPicRl"} src={"http://38.media.tumblr.com/1f1ef6b7eadabb5b4301728d2e6f56c5/tumblr_nf52h3QKKs1s3lkzpo1_400.gif"}/> 
                                <h5 className="winnerText">{this.props.winner.name} Buena onda, sin presiones... todos garparola... cada uno paga: <span className="budget">${this.props.winner.amount2Pay}</span></h5>       
                            </React.Fragment>
                        }
                    </div>
                        
                    )
            }
        
        }


    render(){
        


        if(this.props.error){
            console.log("ENTRO ASTA CAAA", this.props.error.message)
            return(
                <div className="errorMessage">
                    <React.Fragment>{this.props.error.message}</React.Fragment>
                    <button className="returToHome" onClick={this.handleReturn}>Volver</button>
                </div>
                )
            
        }else{
            const winnerData = this.props.winner
            const resultType = winnerData.resultType
            console.log("NI ENTRO")
            return(
            
            
                <React.Fragment className="winnerBanner">{this.renderResult(resultType,winnerData)}</React.Fragment>
            
            )
        }
        
        
      
    }
}


export default RenderWinner 
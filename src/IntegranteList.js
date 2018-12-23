import React, {Component} from 'react'

class IntegranteList extends Component{
    constructor(props){
        super()

this.handleRemoveUser=this.handleRemoveUser.bind(this)
    }    
componentDidMount(){
const data = this.props.membersList
  //  console.log("INTEGERLIST DALEEE" +JSON.stringify(data))
}

handleRemoveUser(key){
   console.log("queres borrar"+key)
   this.props.removeUser(key)
}
    render(){
        const data = this.props.membersList
        return(
            <div>
                <div className="tableHeader">
                    <span>Nombre</span><span>$</span><span>Eliminar</span>
                </div>
                <div className="userContainer">
                    {data.map(item=>{
                    console.log("ITEMMMMM: "+JSON.stringify(item.id))
                    const key = item.id
                        return(
                            <div className="userRow">
                                <h2>{item.userName}</h2>
                                <h3>{item.userBudget}</h3>
                                <button className="removeMemberBtn" onClick={(event)=>{this.handleRemoveUser(key)}}>X</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default IntegranteList;
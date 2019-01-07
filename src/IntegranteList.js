import React, {Component} from 'react'

class IntegranteList extends Component{
    constructor(props){
        super(props)
        this.state={
            showList:false
        }
        

this.handleRemoveUser=this.handleRemoveUser.bind(this)
    }    
componentDidMount(){
const data = this.props.membersList
if(data.lenght > 0){
    this.setState({
        showList:true
    })
}
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
/*
const TableHeader = (props)=>{
const arrayList = Array.from(props.arraydata).length
console.log("LENGHT"+arrayList)
    const lenghtChk = ()=>{
        if(arrayList.length > 0){
            return(
                <div className="tableHeader">
                    <span>Nombre</span><span>$</span><span>Eliminar</span>
                </div>
            )
        }else{
            return null
        }
    }

    const output = lenghtChk()

    return(
        <div>{output}</div>
    )
}*/

export default IntegranteList;
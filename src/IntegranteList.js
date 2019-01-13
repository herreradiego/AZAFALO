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
        showList:true.imgUrl,
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
     
        const renderUser = data.map((item,index)=>{
            const key = item.id
            const url = item.imgUrl
            return(
                <div class="tableData">
                    <span class="ImgNameCont">
                        <img src={url}/>                
                        <span>{item.userName}</span>
                    </span>
                    <span>{item.userBudget}</span>
                    <span><button class="deleteButton" onClick={(event)=>{this.handleRemoveUser(key)}}>Eliminar</button></span>
                </div>
            )
        })
        return(
            <div class="grid">
                <div class="tableHeader">
                    <span>Nombre</span>
                    <span> Budget</span>
                    <span >Eliminar</span>
                </div>
            
            {
             this.state.isLoading ? "Loading..." : renderUser   
            }
                
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
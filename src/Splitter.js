import React from 'react';



class Splitter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading:true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(selection){
    this.props.selectedValue(selection)
  }

  render(){
    return(
      <div>   
        {this.props.displaySplitter ? 
        <div className="splitterContainer">
          <h6>Seleccione la forma en la cual se dividiran los gastos</h6>
          <button onClick={(event)=>{this.handleClick("ruletaRusa")}}>
            <div className="splitterBtn">
              <span className="splliterBtnTitle">RULETA RUSA</span>
              <span className="splitterDescription"> SE ELIGE RANDOM UNA PERSONA DEL LISTADO QUIEN PAGARÁ LA MITAD DE LA CUENTA</span>
            </div>
          </button>
          <button>
            <div className="splitterBtn">
              <span className="splliterBtnTitle">BONDI</span>
              <span className="splitterDescription">DOS INTEGRANTES DEL GRUPO PAGARAN UN 30%</span>
            </div>
          </button>
          <button>
            <div className="splitterBtn">
              <span className="splliterBtnTitle">TODOS X IGUAL</span>
              <span className="splitterDescription">TODOS PAGAN LO MISMO</span>
            </div>
         </button>
        </div> : null}
     </div>
       )
  }
}



  export default Splitter;


 
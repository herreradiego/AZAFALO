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
          <h6 className="SpitterText">Seleccione la forma en la cual se dividiran los gastos, una vez que elijas... no hay vuelta atras...</h6>
          <button onClick={(event)=>{this.handleClick("ruletaRusa")}}>
            <div className="splitterBtn">
              <span className="splliterBtnTitle">RULETA RUSA</span>
              <span className="splitterDescription"> El algoritmo seleccion ramdom a una persona del listado quien pagará la mitad de la cuenta.</span>
            </div>
          </button>
          <button onClick={(event)=>{this.handleClick("bondi")}}>
            <div className="splitterBtn">
              <span className="splliterBtnTitle">BONDI</span>
              <span className="splitterDescription"><span>(Atencion: Minimo 2 integrantes)</span> Dos Integrantes del grupo tienen que gatillar el 30% de la cuenta</span>
            </div>
          </button>
          <button>
            <div onClick={(event)=>{this.handleClick("todosPorIgual")}} className="splitterBtn">
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


 
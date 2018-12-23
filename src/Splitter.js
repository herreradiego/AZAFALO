import React from 'react';



const Splitter = (props)=>{
    return(
   <div>   
     {props.displaySplitter ? <div className="splitterContainer">
      <button onClick={props.handleRuletaRusa}>
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

  export default Splitter;


 
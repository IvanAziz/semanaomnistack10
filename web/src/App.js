import React, {useState, useEffect} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Siderbar.css';
import './Main.css';

import DevItem from './componentes/DevItem';
import DevForm from './componentes/DevForm';

function App(){  
  const [devs, setDevs] = useState([]);
 
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');      
      setDevs(response.data);
    }

    loadDevs();
  }, []);


  async function handleAddDev(data){
    const response = await api.post('/devs',data);

    setDevs([...devs, response.data]);
  }

  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

//import React, {useState} from 'react';

/* Todo REACT é baseado nos 3 três conceitos, se sabe isso sabe REACT
   1. Componente
      - Bloco isolado de HTML, CSS, JS o qual não interfere do restante da aplicação @diego3g
      - É uma função que retorna HTML e pode incluir (CSS || JS)
      - Um App pode ser dividido em vários componentes.
      - Uma função pode chamar outras funções, '<NomeFuncao /> dentro do return de outra função.
      - Regra geral, cada componente/função deve estar em um arquivo separado.
    2. Propriedade
       - Informações que um compoente PAI passa para um componente FILHO, pode passar
       funções, variaveis @diego3g
       - São equivalentes aos atributos do HTML
    3. Estado
       Informações mantidas pelo componente (Lembrar: imutabilidade, melhora muito a performance) @diego3g

*/
// JSX (JavaScript + XML)

// Exemplo de uso de componente dentro de componente <Header />
//import Header from './Header';

// Exemplo de uso de estado
/*
function App() {
  const [counter, setCounter] = useState(0);
  function incrementCounter() {
    setCounter(counter + 1);
  }
  
  return (
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}
*/




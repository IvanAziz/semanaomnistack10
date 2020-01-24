// React deve ser importando sempre que tiver abertura e fechamento de tag
// como <App />
import React from 'react';

// Da habilitade ao React de comunicar com a árvore de elementos 'DOM')
import ReactDOM from 'react-dom';

// Informando ao DOM rederizar ./App
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
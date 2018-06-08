import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let getItem = (val) => {
    return JSON.parse(localStorage.getItem(val));
  };
  const props = {
    todos: getItem('todos'),
    finished: getItem('finished'),
    done: getItem('done')
  };
  
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

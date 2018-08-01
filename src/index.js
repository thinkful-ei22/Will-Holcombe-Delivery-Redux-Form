import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';




import './index.css';
import DemoForm from './components/Form'

ReactDOM.render(
<Provider store={store}>
    <DemoForm />
    </Provider>,
  document.getElementById('root')
);

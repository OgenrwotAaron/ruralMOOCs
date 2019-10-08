import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
//import axios from 'axios';

import Routes from './routes';
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

// axios.get('/user')
// .then(res=>{
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
// })


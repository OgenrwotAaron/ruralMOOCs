import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';

import Routes from './routes';
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

const App=(props) =>{
    return(
        <Provider store={createStoreWithMiddleware(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
            <BrowserRouter>
                <Routes {...props}/>
            </BrowserRouter>
        </Provider>
    )
}

axios.get('/api/user')
.then(res=>{
    ReactDOM.render(
        <App user={res.data}/>
        ,
        document.getElementById('root')
    );
})
.catch(err=>{
    ReactDOM.render(
        <App/>
        ,
        document.getElementById('root')
    );
})


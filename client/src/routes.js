import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/layout'
import Categories from './components/Category/category';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/category/:id" exact component={Categories}/>
            </Switch>
        </Layout>
        
    );
};

export default Routes;
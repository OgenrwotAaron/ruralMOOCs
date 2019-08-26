import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/layout'
import Categories from './components/Category/category';
import Dashboard from './components/Dashboard/dashboard';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/category/:id" exact component={Categories}/>
                <Route path="/dashboard" exact component={Dashboard}/>
            </Switch>
        </Layout>
        
    );
};

export default Routes;
import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/layout'
import Categories from './components/Category/category';
import Dashboard from './components/Dashboard/dashboard';
import Join from './components/Join/join';
import AddCourse from './components/AddCourse/addCourse';
import AddInstructor from './components/AddInstructor/addInstructor';
import CourseSingle from './components/Course/courseSingle';
import AddTopic from './components/AddTopic/addTopic';
import Video from './components/Video/video';

const Routes = (props) => {
    return (
        <Layout user={props.user}>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/category/:id" exact component={Categories}/>
                <Route path="/dashboard/:id" exact component={Dashboard}/>
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path="/join" exact component={Join}/>
                <Route path="/add-course" exact component={AddCourse}/>
                <Route path='/add-instructor' exact component={AddInstructor}/>
                <Route path='/course/:id' exact component={CourseSingle}/>
                <Route path='/addTopic/:id' exact component={AddTopic}/>
                <Route path='/video/:id' exact component={Video}/>
            </Switch>
        </Layout>
        
    );
};

export default Routes;
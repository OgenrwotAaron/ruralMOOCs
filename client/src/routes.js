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
import PublicRoute from './components/AuthRoute/publicRoute';
import PrivateRoute from './components/AuthRoute/privateRoute'
import Inbox from './components/Inbox/inbox';
import Profile from './components/Profile/profile';
import UserProfile from './components/UserProfile/userProfile';
import Messages from './components/Messages/messages';
import EditCourse from './components/EditCourse/editCourse';
import EditInstructor from './components/EditInstructor/editInstructor';

const Routes = (props) => { 
    return (
        <Layout user={props.user}>
            <Switch>
                <Route {...props} path="/" exact component={Home}/>
                <Route {...props} path="/category" exact component={Categories}/>
                <Route path="/category/:id" exact component={Categories}/>
                <PrivateRoute {...props} path="/dashboard/:id/:role" exact component={Dashboard}/>
                <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
                <PublicRoute {...props} restricted={true} path="/join" exact component={Join}/>
                <PrivateRoute {...props} path="/add-course" exact component={AddCourse}/>
                <PrivateRoute {...props} path="/edit-course/:id" exact component={EditCourse}/>
                <PrivateRoute {...props} path='/add-instructor' exact component={AddInstructor}/>
                <PrivateRoute {...props} path="/edit-instructor/:id" exact component={EditInstructor}/>
                <PublicRoute restricted={false} {...props} path='/course/:id' exact component={CourseSingle}/>
                <Route path='/addTopic/:id' exact component={AddTopic}/>
                <PublicRoute restricted={false} {...props} path='/messages/:id' exact component={Messages}/>
                <PublicRoute restricted={false} {...props} path='/video/:id' exact component={Video}/>
                <PublicRoute {...props} restricted={false} path="/inbox/:id" exact component={Inbox}/>
                <PublicRoute {...props} restricted={false} path="/profile/:id" exact component={Profile}/>
                <PublicRoute {...props} restricted={false} path="/user-profile/:id" exact component={UserProfile}/>
            </Switch>
        </Layout>
        
    );
};

export default Routes;

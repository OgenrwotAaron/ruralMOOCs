import React from 'react';
import { Route,Redirect } from 'react-router-dom';

const PrivateRoute = ({
    user,
    component:Comp,
    ...rest
}) => {
    return ( 
        <Route {...rest} component={(props)=>(
            user ?
            (
                user.user.role === 2 || 1 ?
                    <Comp {...props} user={user} />
                :
                    <Redirect to="/"/>
            )
            :
            <Redirect to="/join"/>
        )}/>
     );
}
 
export default PrivateRoute;
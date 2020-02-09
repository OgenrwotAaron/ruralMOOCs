import React from 'react';
import { Route,Redirect } from 'react-router-dom'

const PublicRoute = ({
    user,
    component:Comp,
    ...rest
}) => {
    return <Route {...rest} component={(props)=>(
        rest.restricted ?
        (
            user ?
            <Redirect to="/"/>
            :
            <Comp {...props} user={user}/>
        )
        :
        (
            user ?
            <Comp {...props} user={user} />
            :
            <Redirect to='/join'/>
        )
        
    )}/>
}
 
export default PublicRoute;
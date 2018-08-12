import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/notFound/NotFound';
import Login from '@/views/login/Login';
import App from './App';
import Register from '@/views/register';
import ChangePwd from '@/views/login/ChangePwd';
export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render = {
                () => {
                    console.log('localStorage',localStorage.getItem('user'))
                    if(localStorage.getItem('user') && localStorage.getItem('user').length){
                        return <Redirect to="/app" push/>
                    }else{
                        return <Redirect to="/login" push/>
                    }
                }
            } />
            <Route exaxt path="/register" component={Register} />    
            <Route exact path="/changePwd" component={ChangePwd} /> 
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)
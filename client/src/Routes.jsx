import { Route, BrowserRouter, Switch} from "react-router-dom"
import React from "react"

import Home from "./pages/home/Index"
import About from "./pages/about/Index"
import Page404 from "./pages/page404/404"
import Register from "./pages/register/Index"
import Login from "./pages/login/Index"
import Passwords from "./pages/passwords/Index"

export default function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact={true}/>
                <Route component={About} path="/sobre" exact={true}/>
                <Route component={Register} path="/register" exact={true}/>
                <Route component={Login} path="/login" exact={true}/>
                <Route component={Passwords} path="/senhas" exact={true}/>
                <Route component={Page404} path="*"></Route>
            </Switch>
        </BrowserRouter>
    )
}

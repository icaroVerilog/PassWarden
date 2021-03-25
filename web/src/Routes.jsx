import { Route, BrowserRouter, Redirect} from "react-router-dom"
import React from "react"

import Home from "./pages/home/Index"
import CreatePassword from "./pages/createPassword/Index"
import About from "./pages/about/Index"

export default function Routes(props) {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact={true}/>
            <Route component={CreatePassword} path="/gerar-senha"/>
            <Route component={About} path="/sobre"/>
            
            <Redirect from="*" to="/"/>
        </BrowserRouter>
    )
}

import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes as Switch,
} from "react-router-dom";
import Home from '../views/Home';
import Login from '../views/Login';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
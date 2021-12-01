import { Fragment } from 'react';
import CustomersList from './CustomersList';
import { BrowserRouter, Switch, Router, Routes, Route, Outlet, Link } from "react-router-dom";
import Test from './Test';


export default function TopMenu() {
    return (

            <BrowserRouter>
                <Link to="/">Home</Link>{' '}
                <Link to="/test"> Test</Link>{' '}
                <Link to="/customers"> Customers</Link>{' '}
                <Switch>
                    <Route exact path="/" render={() => <h1>Tervetuloa</h1>}/>
                    <Route exact path="/customers" >
                    <CustomersList />
                    </Route>
                    <Route exact path="/test" component={Test}/>
                </Switch> 
            </BrowserRouter>

    )
}

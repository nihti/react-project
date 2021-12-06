import { Fragment } from 'react';
import CustomersList from './CustomersList';
import { BrowserRouter, Switch, Router, Routes, Route, Outlet, Link } from "react-router-dom";
import TrainingsCalendar from './TrainingsCalendar';


export default function TopMenu() {
    return (
            // https://ui.dev/react-router-v5-pass-props-to-components 
            <BrowserRouter>
                <Link to="/">Home</Link>{' '}
                <Link to="/customers"> Customers</Link>{' '}
                <Link to="/trainings"> Trainings</Link>{' '}
                <Switch>
                    <Route exact path="/" render={() => <h1>Tervetuloa</h1>}/>
                    <Route exact path="/customers" >
                        <CustomersList />
                    </Route>
                    <Route exact path="/trainings">
                        <TrainingsCalendar />
                    </Route>
                </Switch> 
            </BrowserRouter>
    )
}

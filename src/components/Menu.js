import { Fragment } from 'react';
import CustomersList from './CustomersList';
import { BrowserRouter, Switch, Router, Routes, Route, Outlet, Link } from "react-router-dom";
import TrainingsCalendar from './TrainingsCalendar';
import Home from './Home';
import ParticlesDemo from './ParticlesDemo';
import { Button } from '@mui/material';
import '../styles/home.css';


export default function Menu() {

    return (
        /* https://ui.dev/react-router-v5-pass-props-to-components  */
        <Fragment>
            <ParticlesDemo />
            <div>
            <BrowserRouter >
                <div className='menu-container'>
                    <Link className='slider2' to="/"  > Home</Link>{' '}
                    <Link className='slider2' to="/customers" > Customers</Link>{' '}
                    <Link className='slider2' to="/trainings" > Calendar</Link>{' '}
                </div>
                <Switch>
                    <Route exact path="/" >
                        <Home />
                    </Route>
                    <Route exact path="/customers" >
                        <CustomersList />
                    </Route>
                    <Route exact path="/trainings">
                        <TrainingsCalendar />
                    </Route>
                </Switch>
            </BrowserRouter>
            </div>
        </Fragment>
    )
}

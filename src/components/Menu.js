import { Fragment } from 'react';
import CustomersList from './customer/CustomersList';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import TrainingsCalendar from './training/TrainingsCalendar';
import Home from './Home';
import ParticlesDemo from './ParticlesDemo';
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

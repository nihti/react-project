import React, { Fragment } from 'react';
import CustomersList from './customer/CustomersList';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import TrainingsCalendar from './training/TrainingsCalendar';
import Home from './Home';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default function Menu() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        /* https://ui.dev/react-router-v5-pass-props-to-components  */
        <BrowserRouter >
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab style={{color: '#fff'}} label="Home" component={Link} to="/" />
                    <Tab style={{color: '#fff'}} label="Customers" component={Link} to="/customers" />
                    <Tab style={{color: '#fff'}} label="Calendar" component={Link} to="/trainings" />
                </Tabs>
            </Box>
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
    )
}

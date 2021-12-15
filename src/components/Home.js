//import '../styles/home.css';
import { Fragment } from 'react';
import { reset } from '../services/services';
import { Button } from '@mui/material';
import ParticlesDemo from './ParticlesDemo';
//import '../styles/home.css';
// import Particles from 'react-tsparticles';

/**  
 * React Particles.js: https://github.com/matteobruni/tsparticles/tree/main/components/react 
 */

export default function Home() {
    return (
        <Fragment>
            <ParticlesDemo />
            <div className='home'>
                <br/>
                <br/>
                <h1>FRONTEND COURSE HAAGA-HELIA</h1>
                <br/>
                <br/>
                <h3 className="span">
                    REACT FINAL PROJECT
                </h3>
                <h3>Workout application</h3>
                <br/>
                <br/>
                <Button onClick={reset} color="error"> RESET THE EXERCISE </Button>
                <p>(resets the customer & training info - doesn't do anything to the background animation)</p>

            </div>
        </Fragment>
    )
}
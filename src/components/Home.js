import '../styles/home.css';
import { Fragment } from 'react';
import { reset } from '../services/services';
import { Button } from '@mui/material';
import ParticlesDemo from './ParticlesDemo';
import '../styles/home.css';
// import Particles from 'react-tsparticles';

/**  
 * React Particles.js: https://github.com/matteobruni/tsparticles/tree/main/components/react 
 */

export default function Home() {
    return (
        <Fragment>
            <ParticlesDemo />
            <div className='home'>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <h1>REACT FINAL PROJECT</h1>
                <h3 className="span">
                    FRONTEND COURSE HAAGA-HELIA
                </h3>
                <p>Workout application</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                <p>(resets the customer & training info - doesn't do anything to the background animation)</p>

                <Button onClick={reset} color="error"> RESET THE EXERCISE </Button>
            </div>
        </Fragment>
    )
}
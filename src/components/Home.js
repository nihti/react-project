import { Fragment } from 'react';
import AlertDialog from '../services/alert';
import ParticlesDemo from './ParticlesDemo';

/**  
 * React Particles.js: https://github.com/matteobruni/tsparticles/tree/main/components/react 
 */

export default function Home() {
    /**
     * AlertDialogille passattavat propsit.
     * Käytössä vain täällä Home-komponentissa, 
     * mutta ratkaisu rakennettu skaalautuvuutta silmälläpitäen 
     * (myöhässä, ei skaalautuvien raktaisujen rinnalle)
     */
    const alertProps = {
        size: "medium",
        buttonText: "Reset the exercise",
        title: "Are you sure you want to reset the database?",
        dialogText: "This deletes all the current changes to the customers and trainings. Action cannot be undone.",
        action: () => {
            fetch('http://customerrest.herokuapp.com/reset', {
                method: 'POST'
            })
                .then(resp => {
                    if (resp.ok) {
                        alert('Database resetted');
                    } else {
                        alert('Something went wrong')
                    }
                })
                .catch(err => console.error(err));
        }
    }

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
                <AlertDialog alertProps={ alertProps } />
                <p>(resets the customer & training info - doesn't do anything to the background animation)</p>
            </div>
        </Fragment>
    )
}
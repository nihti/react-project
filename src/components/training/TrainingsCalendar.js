import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { dataFetcher } from '../../services/services';
import moment from 'moment';

export default function TrainingsCalendar() {

    /**
     * Haetaan arvot ja asetetaan ne stateen halutussa muodossa 
     * ja asetetaan state komponentille
     */
    const [trainings, setTrainings] = useState([]);
    let events = [];
    const url = 'https://customerrest.herokuapp.com/api/trainings';

    /** 
     * Paras vaihtoehto olisi asettaa data oikeassa muodossa heti stateen
     * mutta se ei onnistunut
     */
    useEffect(() => { dataFetcher(url, setTrainings) }, []);

    // Avaimet voittoon: scopen asettaminen () ja listan rajaaminen vain [...events]  
    events = trainings.map((train, i) =>
    ([...events], {
        id: i,
        title: train.activity,
        /** 
         * Tämän vastauksen pohjalta onnistunut format: 
         * https://stackoverflow.com/questions/39735724/how-to-parse-iso-8601-into-date-and-time-format-using-moment-js-in-javascript/39736368#39736368
         */
        start: moment(train.date).utc().format('YYYY-MM-DDTHH:mm:ss')
    })
    );

    return (
        <div className='calendar-container' style={{ paddingTop: '110px' }}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="auto"
            />
        </div>
    );
}
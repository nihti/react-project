import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
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
    // const [customer, setCustomer] = useState();
    let events = [];
    const url = 'https://customerrest.herokuapp.com/api/trainings';

    console.log(trainings);

    /** 
     * Paras vaihtoehto olisi asettaa data oikeassa muodossa heti stateen
     * mutta se ei onnistunut
     */
    useEffect(() => { dataFetcher(url, setTrainings) }, []);


    // Avaimet voittoon: scopen asettaminen () ja listan rajaaminen vain [...events]  
    events = trainings.map((train) => 
    // Täällä asetetaan yksittäisen eventin data 
        ([...events], {
            id: train.links[0].href.split("https://customerrest.herokuapp.com/api/trainings/")[1],
            title: train.activity,
            /** 
             * Tämän vastauksen pohjalta onnistunut format: 
             * https://stackoverflow.com/questions/39735724/how-to-parse-iso-8601-into-date-and-time-format-using-moment-js-in-javascript/39736368#39736368
             */
            start: moment(train.date).utc().format('YYYY-MM-DDTHH:mm:ss'),
            extendedProps: {
              customer: train.links[0].href+'/customer',
              duration: train.duration
            }
        })
    );

    const eventClick = (info) => {
        // dataFetcher(info.event._def.extendedProps.customer, setCustomer);
        console.log(info);
        fetch(info.event._def.extendedProps.customer)
        .then(res => res.json())
        .then(data => { 
            const msg = 'customer: ' + data.firstname + ' ' +data.lastname + ', duration: ' +info.event._def.extendedProps.duration +' min';
            const add = info.event._def.title;
            alert(msg + '(' + add + ')') 
        })
        .catch(err => console.error(err))

    }

    return (
        <div className='calendar-container' style={{ paddingTop: '80px' }}>
            <p> Click event to see the customer & duration </p>
            <br/>
            <FullCalendar
                // https://levelup.gitconnected.com/create-a-month-week-and-day-view-calendar-with-react-and-fullcalendar-1794d76e6d06
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    center: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={events}
                height="auto"
                eventClick={eventClick}
            /> 
        </div>
    );
}
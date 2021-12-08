import React, { componentDidUpdate, useEffect, useState, Fragment } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { linkClasses } from '@mui/material/Link';
import { dataFetcher } from './Services';

export default function TrainingsCalendar() {

    /*
    Haetaan arvot ja asetetaan ne stateen halutussa muodossa 
    ja asetetaan state komponentille
    */
    
    const [trainings, setTrainings] = useState([]);
    const [events, setEvents] = useState([]);
    const url = 'https://customerrest.herokuapp.com/api/trainings';

    /** 
     * Paras vaihtoehto olisi asettaa data oikeassa muodossa heti stateen
     * mutta se ei onnistunut
     */
    useEffect(() => { dataFetcher(url, setTrainings) }, []);
    
    return (
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={trainings}
        />
    );
    /*
    setEvents(
        trainings.map((e, i) => {
            [...events, {
                id: i,
                title: e.activity,
                date: e.date
            }]
        })
    );*/

    /*
    const columns = [
        { field: 'date'             },
        { field: 'duration'         }, 
        { field: 'activity'         },
        { field: 'content'          },
        {
            headerName: 'Customer',
            field: 'links.2.href',
            cellRendererFramework: p => (
                <CustomerField params={p.value} />
            )
        }
    ];
    */


}
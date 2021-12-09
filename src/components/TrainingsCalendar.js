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
    let events = [];
    const url = 'https://customerrest.herokuapp.com/api/trainings';

    /** 
     * Paras vaihtoehto olisi asettaa data oikeassa muodossa heti stateen
     * mutta se ei onnistunut
     */
    useEffect(() => { dataFetcher(url, setTrainings) }, []);
    // console.log(trainings)

    // Avaimet voittoon: scopen asettaminen () ja listan rajaaminen vain [...events]  
    events = trainings.map((train, i) => (
        [...events], {
            id: i,
            title: train.activity,
            start: train.date
        })
    );
        
    return (
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            // inlinenä eventsiin 
            events={ events }
        />
    );
    

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
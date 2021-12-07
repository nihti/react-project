import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { PropertyKeys } from 'ag-grid-community';
import { isEndOfRange } from '@mui/lab/internal/pickers/date-utils';

/**  
 * https://fullcalendar.io/docs/react
 * */ 

export default function Calendar(props) {
    /**
     * activity: "Jogging"
     * content: Array []
     * date: "2021-12-07T04:23:17.819+00:00"
     * duration: 90
     * links: Array(3) [ {…}, {…}, {…} ]
     * <prototype>: Object { … }
     */
    const [trainings, setTrainings] = useState([
 
    ]);
    // array
    const data = props.trainings;
    // const helper = [];
    /** 
     * props.trainings on Array objekteja
     * Halutaan muokata näitä objekteja 
     * date attribuutin perusteella kuitenkin Calendar osaa näyttää listan sellaisenaan
     * mutta ei muilta osi nätisti
     * 
     *      id: i,
            title: train.activity,
            date: train.date
     */
    
    /*
    const mapData = () => props.trainings.map((train, i) => [...data, {
        id: i,
        title: train.activity,
        date: train.date
    }]); */

    /*
    useEffect(() => { setTrainings ( 
        props.trainings.map((train, i) => [...trainings, {
            id: i,
            title: train.activity,
            date: train.date
        }])
     )}, []);
    */ 

    // useEffect(() => { setTrainings(mapData) }, []);

    // console.log(data); 

     return (
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={// jos tänne antaa listan propsina toimii mutta ei statena 
                data
            }
        />
    )
}
import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

/**  
 * https://fullcalendar.io/docs/react
 * */ 

export default function Calendar(props) {
    return (
    <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
    />
    )
}
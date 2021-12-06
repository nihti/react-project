import React, { useEffect, useState, Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Snackbar, Button } from '@mui/material/';
import { defaultColDef, dataFetcher } from './Services';
import TrainingsListDialog from './TrainingsListDialog';
import CustomerField from './CustomerField';

export default function TrainingsCalendar() {
    const [trainings, setTrainings] = useState([]);
    const url = 'https://customerrest.herokuapp.com/api/trainings';

    useEffect(() => { dataFetcher(url, setTrainings) }, []);

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
    ]

    return (
        <Fragment>
            <h1>Trainigns Calendar</h1>
            <div className="ag-theme-alpine" style={{ height: 600, width: '80%', margin: 'auto', paddingTop: '80px'}}>
                <AgGridReact 
                    rowData={trainings}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                />
            </div>
        </Fragment>
    );
}
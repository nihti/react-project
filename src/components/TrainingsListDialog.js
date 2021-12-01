import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import TopMenu from './TopMenu';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

    /**
     * content	
        0	
        date	null
        duration	90
        activity	"Jogging"
        content	[]
        links	
        0	
        rel	"self"
        href	"https://customerrest.herokuapp.com/api/trainings/147"
        1	
        rel	"training"
        href	"https://customerrest.herokuapp.com/api/trainings/147"
        2	
        rel	"customer"
        href	"https://customerrest.herokuapp.com/api/trainings/147/customer"
     */

export default function TrainingsListDialog(props) {
    const [trainingsData, setTrainingsData] = useState([]);
    const [open, setOpen] = useState(false);
    // Käyttäjäid
    const id = props.trainings.value.split("https://customerrest.herokuapp.com/api/customers/")[1];

    const getTrainings = () => {
        fetchTrainings();
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false);
    }

    const fetchTrainings = () => {
        const url = props.trainings.value+"/trainings";
        fetch(url)
        .then(res => res.json())
        .then(data => { setTrainingsData(data.content); console.log(data.content) })
        .catch(err => console.error(err))
        if (trainingsData) {
            console.log(id);
            console.log(trainingsData);
        }
        
    }

    const defaultColDef = {
        sortable: false,
        filter: false,
        flex: 1
    }

    const columns = [
        { field: 'date'         },
        { field: 'activity'     },
        { field: 'duration'     },
        { field: 'content'      },
        { 
            headerName: 'Link',
            field: 'links.2.href' }
        ,
    ];

    return (
        <Fragment>
            <Button onClick={getTrainings}>Trainings</Button>
            <Dialog open={open} onClose={closeDialog} fullScreen >
                <DialogTitle style={{textAlign: 'center' }}>Trainings of user id {id} </DialogTitle>
                <a style={{textAlign: 'center' }} href="/customers">Back to customers list</a>
                <DialogContent >
                    <div className="ag-theme-alpine" style={{ height: 400, width: '100%', margin: 'auto' }}>
                        <AgGridReact 
                            rowData={trainingsData}
                            columnDefs={columns}
                            defaultColDef={defaultColDef}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}></Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );

}
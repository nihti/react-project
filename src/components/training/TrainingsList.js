import React, { useState } from 'react';
import { Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddTraining from './AddTraining';
import RemoveTraining from './RemoveTraining';
import TrainingsChart from './TrainingsChart';

export default function TrainingsList(props) {
    const [trainingsData, setTrainingsData] = useState([]);
    const [open, setOpen] = useState(false);

    const customer = props.trainings.value;
    // Käyttäjäid
    const id = customer.split("https://customerrest.herokuapp.com/api/customers/")[1];

    const getTrainings = () => {
        fetchTrainings();
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false);
    }

    const fetchTrainings = () => {
        const url = customer + "/trainings";
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
        { field: 'date' },
        { field: 'activity' },
        { field: 'duration' },
        { field: 'content' },
        {
            headerName: 'Remove training',
            field: 'link.2.href',
            cellRendererFramework: url => (
                <RemoveTraining url={url.data.links[0]} fetchTrainings={fetchTrainings} />
            )
        }
    ];

    return (
        <Fragment>
            <Button onClick={ getTrainings } size='small'>Trainings</Button>
            <Dialog open={open} onClose={ closeDialog } fullScreen >
                <DialogTitle style={{ textAlign: 'center' }}>Trainings of user id {id} </DialogTitle>
                <a style={{ textAlign: 'center' }} href="/customers">Back to customers list</a>
                <AddTraining customer={ customer } fetchTrainings={ fetchTrainings } />
                <TrainingsChart data={ trainingsData } />
                <DialogContent >
                    <div className="ag-theme-alpine" style={{ height: 400, width: '100%', margin: 'auto' }}>
                        <AgGridReact
                            rowData={ trainingsData }
                            columnDefs={ columns }
                            defaultColDef={ defaultColDef }
                        />
                    </div>                  
                </DialogContent>
                <DialogActions>
                    <Button onClick={ closeDialog }></Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );

}
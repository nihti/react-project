import React, { useState, useEffect } from 'react';
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
import { dataFetcher, defaultColDef } from '../../services/services';

export default function TrainingsList(props) {
    /** Statet */
    const [trainingsData, setTrainingsData] = useState([]);
    const [open, setOpen] = useState(false);

    /** Muuttujat */
    const fn = props.trainings.data.firstname;
    const ln = props.trainings.data.lastname;
    const customer = props.trainings.value;

    /** Metodit */
    const getTrainings = () => {
        fetchTrainings();
        setOpen(true);
    }
    const closeDialog = () => {
        setOpen(false);
    }
    const fetchTrainings = () => {
        const url = customer + "/trainings";
        dataFetcher(url, setTrainingsData);
    }

    /** AG grid sarakemäärittelyt */
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
            <Button onClick={getTrainings} size='small'>Trainings</Button>
            <Dialog
                open={open}
                onClose={closeDialog}
                fullScreen
                PaperProps={{
                    style: {
                        backgroundColor: '#1e1f26',
                    },
                }}>
                <DialogTitle style={{ textAlign: 'center', color: 'white' }}>Trainings of {fn} {ln} </DialogTitle>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={closeDialog}>Back to customers list</Button>
                </DialogActions>
                <AddTraining customer={customer} fetchTrainings={fetchTrainings} />
                <TrainingsChart data={trainingsData} />
                <DialogContent >
                    <div className="ag-theme-alpine" style={{ height: 400, width: '100%', margin: 'auto' }}>
                        <AgGridReact
                            rowData={trainingsData}
                            columnDefs={columns}
                            defaultColDef={defaultColDef}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );

}
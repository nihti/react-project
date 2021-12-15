import React, { useState } from 'react';
import { Fragment } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from 'moment';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState( {
        date: new Date(),
        activity: '',
        duration: '',
        customer: props.customer
    });

    const sesam = () => {
        setOpen(true);
    }
    const close = () => {
        setOpen(false);
    }

    const handleSave = () => {
        const date = moment().toISOString(training.date);
        setTraining({ ...training, date: date });
        addTraining();
        close();
    }

    const addTraining = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings/', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json' },
            body: JSON.stringify(training)
        })
        .then(resp => {
            if (resp.ok) {
                props.fetchTrainings();
                alert('Training added succesfully!');
            } else {
                alert('Something went wrong')
            }
        })
        .catch(err => console.log(err))
    }

    const inputChanged = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value })
    }

    // toISOString() 
    // toISOString() use javascript Date object (this.toDate().toISOString();) 
    // which is compile and managed by your browser.
    return (
        <Fragment>
            <Button onClick={sesam} size="small">Add training</Button>
            <Dialog open={open} onClose={close}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    <DateTimePicker 
                        label=""
                        type="date"
                        name="date"
                        value={training.date}
                        onChange={date => setTraining({...training, date: date})}
                        renderInput={ (params) => <TextField {...params} /> }
                    />
                    <TextField
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={ close }>
                        Cancel
                    </Button>
                    <Button onClick={ handleSave }>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
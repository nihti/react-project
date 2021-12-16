import { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
    const [open, setOpen] = useState(false);
    // const [resetDb, setResetDb] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAction = () => {
        // suljetaan dialogi
        setOpen(false);
        // resetoidaan kanta    
        props.alertProps.action();
    }

    return (
        <Fragment>
            <Button variant="outlined" color="error" onClick={handleClickOpen} size={props.alertProps.size}>
                {props.alertProps.buttonText}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.alertProps.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.alertProps.dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autofocus> Disagree </Button>
                    <Button onClick={handleAction}> Agree </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
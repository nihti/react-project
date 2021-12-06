import React, { useState, Fragment } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { customersUrl } from './customer';
import { dataFetcher } from '../Services';

/**
 * Add a new customerYou can add new customer by calling /customers endpoint 
 * using thePOST method and giving a new customer inside the request body as a JSON stringHeader: 
 * 'Content-Type': 'application/json'Body:   
 * { firstname: "John"  lastname: "Smith"  email: "j.s@smith.com"  phone: "343-2332345"
 * streetaddress: "Yellow Street 23"   postcode: "344342"  city: "Yellowstone" }
 */

export default function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '', 
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const inputChanged = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    const addCustomer = () => {
        fetch(customersUrl, {
            method: 'POST',
            headers: { 'Content-type' : 'application/json' },
            body: JSON.stringify(customer)
        })
        .then(resp => {
            if (resp.ok) {
                dataFetcher(customersUrl, props.setCustomers);
                alert('Asiakas lisätty onnistuneesti')
            } else {
                alert('jokin meni vikaan lisäyksessä')
            }
        })
        .catch(err => console.error(err))
    }

    const handleSave = () => {
        addCustomer();
        setOpen(false);
    }

    return (
        <Fragment>
            <Button onClick={ () => setOpen(true) } size="small">Add customer</Button>
            <Dialog open={open} onClose={ () => setOpen(false) }>
                <DialogTitle>New customer</DialogTitle>
                <DialogContent>

                <TextField
                    name="firstname"
                    value={customer.firstname}
                    onChange={inputChanged}
                    margin="dense"
                    label="Firstname"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="lastname"
                    value={customer.lastname}
                    onChange={inputChanged}
                    margin="dense"
                    label="Lastname"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="email"
                    value={customer.email}
                    onChange={inputChanged}
                    margin="dense"
                    label="Email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="phone"
                    value={customer.phone}
                    onChange={inputChanged}
                    margin="dense"
                    label="Phone"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={inputChanged}
                    margin="dense"
                    label="Street Address"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="postcode"
                    value={customer.postcode}
                    onChange={inputChanged}
                    margin="dense"
                    label="Postcode"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="city"
                    value={customer.city}
                    onChange={inputChanged}
                    margin="dense"
                    label="City"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={ () => setOpen(false) }>
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
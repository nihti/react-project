import React, { useState, Fragment } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { dataFetcher } from '../../services/services';
import { customersUrl } from './customer';
 
export default function EditUser(props) {
    // Dialogin state
    const [open, setOpen] = useState(false);
    // Propsina passattu asiakkaan yksilöivä url
    const url = props.id;
    // Asiakasobjektin state
    const [customer, setCustomer] = useState({});

    // Hae klikatun asiakkaan data
    const getCustomerData = () => {
        fetch(url)
        .then(res => res.json())
        .then(data => setCustomer({
            // Asetetaan asiakaobjektille arvot
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            streetaddress: data.streetaddress,
            postcode: data.postcode,
            city: data.city
        }))
        .catch(err => console.error(err))
    }

    // Haetaan data vasta kun asiakasta klikataa
    // Avataan muokkausnäkymä
    const EditCustomer = () => {
        getCustomerData();
        setOpen(true);
    }

    // Seuraa syöttökenttien muutoksia
    const inputChanged = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }
    
    // Lähetetään muokattu data bäkkäriin 
    const handleSave = () => {
        updateCustomer();
    }

    // Varsinainen muokkauspyyntö backendiin
    const updateCustomer = () => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
        .then(res => {
            if (res.ok) {
                dataFetcher(customersUrl, props.setCustomers); 
                alert('Customer edited successfully')
            } else {
                alert('Something went wrong')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <Fragment>
            <Button size="small" onClick={ EditCustomer } color="error">
                Edit
            </Button>
            <Dialog open={open} onClose={ () => setOpen(false) }>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                <TextField
                    name="firstname"
                    value={customer.firstname}
                    onChange={inputChanged}
                    margin="dense"
                    label="Firstname"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="lastname"
                    value={customer.lastname}
                    onChange={inputChanged}
                    margin="dense"
                    label="Lastname"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={inputChanged}
                    margin="dense"
                    label="Streetaddress"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="postcode"
                    value={customer.postcode}
                    onChange={inputChanged}
                    margin="dense"
                    label="Postcode"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="city"
                    value={customer.city}
                    onChange={inputChanged}
                    margin="dense"
                    label="City"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="email"
                    value={customer.email}
                    onChange={inputChanged}
                    margin="dense"
                    label="Email"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="phone"
                    value={customer.phone}
                    onChange={inputChanged}
                    margin="dense"
                    label="Phone"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
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
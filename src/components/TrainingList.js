import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function TrainingList(props) {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    // polku JSON dataan
    // const trainigns = props.trainigns;

    // console.log(props.trainings.value+"/trainings");

    // Ei haluta hakea heti kaikkea dataa, vasta käyttäjän klikatessa 

    // https://customerrest.herokuapp.com/api/customers/81/trainings
    // https://customerrest.herokuapp.com/api/customers/81/trainings
    // 

    

    const getTrainings = () => {
        fetchTrainings();
        // console.log(trainings);
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false);
    }

    const fetchTrainings = () => {
        fetch(props.trainings.value+"/trainings")
        .then(res => res.json())
        .then(myJson => {setTrainings(myJson.content)})
        .catch(err => console.error(err))
    }

    /**
     * Array [ {…}, {…} ]
        0: Object { date: "2021-12-01T12:16:55.636+00:00", duration: 60, activity: "Spinning", … }
     */

    const defaultColDef = {
        sortable: false,
        filter: false,
        flex: 1
    }

    const columns = [
        { field: 'date' },
        { field: 'activity' },
        { field: 'duration'}
    ];

   // console.log("Treenit;")
   // console.log(trainings);


    return (
        <Fragment>
            <h1>Hello</h1>
        </Fragment>
    );
    /*
    useEffect(() => {
        fetch(props.trainings)
        .then(res => res.json())
        // console.log(res)
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }, []);
    */

    /*
    useEffect(() => { fetchData() }, []);

    // Hae kaikki asiakkaat
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    // Kaikille sarakkeille yhteiset arvot
    const defaultColDef = {
        sortable: true,
        filter: true,
        flex: 1
    }

    // Varsinaiset sarakkeet, lista objekteja
    const columns = [
        { field: 'firstname',       },
        { field: 'lastname'         }, 
        { field: 'streetaddress'    },
        { field: 'postcode'         },
        { field: 'city'             },
        { field: 'email'            },
        { field: 'phone'            },
        { 
            headerName: 'Trainings',
            field: 'links.0.href',
            sortable: false,
            filter: false,
            // Tähän linkin sijaan button, ja buttonille oma komponentti
            cellRendererFramework: p => (
                <a href={p.value}>Trainings</a>
            )
        }
    ];
*/

}
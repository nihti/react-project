import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { defaultColDef } from './CustomerColumns';
import TrainingsListDialog from './TrainingsListDialog';
import RemoveCustomer from './RemoveCustomer';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

export default function CustomersList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    /** 
     * Datan viemistä CSV muodossa varten oleva uusi state joka täytetään AgGridReact komponentista löytyvällä datalla myöhemmin
     * https://www.ag-grid.com/react-data-grid/csv-export/#example-csv-export 
     */
    const [gridApi, setGridApi] = useState(null);
    /**
     * Effect Hook https://reactjs.org/docs/hooks-effect.html
     * fetchData-funktio ensimmäisenä ja 
     * tyhjä [] toisena argumenttina 
     * efektin laukaisemiseksi komponentin rendatessa ensimmäisen kerran
     */
    useEffect(() => { fetchData() }, []);

    // Hae kaikki asiakkaat
    // Tämä Services.js:ään täältä 
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(data => { setCustomers(data.content)} )
        .catch(err => console.error(err))
    }

    // Tämä pitää siirtää AddCustomeriin 
    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json' },
            body: JSON.stringify(customer)
        })
        .then(resp => {
            if (resp.ok) {
                fetchData();
                setOpen(true);
            } else {
                alert('jokin meni vikaan lisäyksessä')
            }
        })
        .catch(err => console.error(err))
    }
    
    /** 
     * Varsinaiset sarakkeet, lista objekteja, käyttävät headerNamena fieldiään 
     * Field = JSON data attribuutin nimi, esim content.firstname 
     * */ 
    const columns = [
        { field: 'firstname',       },
        { field: 'lastname'         }, 
        { field: 'streetaddress'    },
        { field: 'postcode'         },
        { field: 'city'             },
        { field: 'email'            },
        { field: 'phone'            },
        /**  
         * Sarakkeet, joissa linkki treenilistasivuille 
         * Attribuutti cellRendererFramework: 
         * https://www.ag-grid.com/react-data-grid/components/ 
         */
        { 
            headerName: 'Show trainings',
            field: 'links.0.href',
            sortable: false,
            filter: false,
            // Halutaan saada linkki, jota painamalla vie treeneihin
            // Nyt meillä on arvo joka halutaan passata komponentille propsina
            // Sitten pitää tehdä itse komponentti 
            // Mutta komponenttia ei haluta rendata suoraan tämän listan sisään, vaan ohjata linkistä rendattavaan komponenttiin
            // Voisi tehdä popupin 
            // https://ui.dev/react-router-v5-pass-props-to-components 
            cellRendererFramework: params => (  
                <TrainingsListDialog trainings={params} />
            )
        }, 
        {  
            headerName: 'Remove customer', 
            field: 'links.0.href', 
            sortable: false, 
            filter: false, 
            width: 120,
            cellRendererFramework: params => (
                // fetchData funktio passataan viitteenä
                // mutta sitä kutsutaan funktiona fetchData() Child komponentissa
                <RemoveCustomer id={params.value} fetchData={fetchData} />
            )
        },
        {  
            headerName: 'Edit customer', 
            field: 'links.0.href', 
            sortable: false, 
            filter: false, 
            width: 120,
            cellRendererFramework: params => (
                // fetchData funktio passataan viitteenä
                // mutta sitä kutsutaan funktiona fetchData() Child komponentissa
                <EditCustomer id={params.value} fetchData={fetchData} />
            )
        },
    ];

    // AgGridReact-komponentin attribuutille onGridReady luotu funktio 
    const onGridReady = (p) => {
        setGridApi(p.api);
        console.log(p.api);
    };

    const onBtnExport = () => {
        gridApi.exportDataAsCsv();
    };


    return (
        <Fragment>
            <AddCustomer addCustomer={ addCustomer } />
            <Button onClick={() => onBtnExport()}> CSV </Button>
            <div className="ag-theme-alpine" style={{ height: 600, width: '80%', margin: 'auto', paddingTop: '80px'}}>
                <AgGridReact 
                    rowData={customers}
                    columnDefs={columns}
                    // Kaikille sarakkeille yhteiset arvot
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                />
            </div>
            <Snackbar 
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Customer added succesfully"
            />
        </Fragment>
    );
}
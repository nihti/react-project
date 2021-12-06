import React, { useEffect, useState, Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Snackbar, Button } from '@mui/material/';
import { defaultColDef, dataFetcher } from './Services';
import { AddCustomer, EditCustomer, RemoveCustomer, customersUrl, customerColumns } from './customer/customer';

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
    useEffect(() => { dataFetcher(customersUrl, setCustomers) }, []);
    /** 
     * Varsinaiset sarakkeet, lista objekteja, käyttävät headerNamena fieldiään 
     * Field = JSON data attribuutin nimi, esim content.firstname 
     * */ 
    const columns = [...customerColumns,
        {  
            headerName: 'Remove customer', 
            field: 'links.0.href', 
            sortable: false, 
            filter: false, 
            width: 120,
            cellRendererFramework: params => (
                // fetchData funktio passataan viitteenä
                // mutta sitä kutsutaan funktiona fetchData() Child komponentissa
                <RemoveCustomer id={params.value} setCustomers={setCustomers} />
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
                <EditCustomer id={params.value} setCustomers={setCustomers} />
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
            <AddCustomer setCustomers={setCustomers} />
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
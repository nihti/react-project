import React, { useEffect, useState, Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Snackbar, Button } from '@mui/material/';
import { defaultColDef, dataFetcher } from '../../services/services';
import { 
    AddCustomer, 
    EditCustomer, 
    RemoveCustomer, 
    customersUrl, 
    customerColumns,
    
 } from './customer';

export default function CustomersList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    /** 
     * Datan viemistä CSV muodossa varten oleva uusi state joka täytetään AgGridReact komponentista löytyvällä datalla myöhemmin
     * https://www.ag-grid.com/react-data-grid/csv-export/#example-csv-export 
     */
    const [gridApi, setGridApi] = useState(null);

    // AgGridReact-komponentin attribuutille onGridReady luotu funktio 
    const onGridReady = (p) => {
        setGridApi(p.api);
    };

    const onBtnExport = () => {
        const params = {
            // Kuinka skipata sarakkeita: https://pretagteam.com/question/aggrid-skip-column-on-export-to-csv 
            // columnKeys käyttää colId:tä joka defaulttaa field-attribuuttiin uupuessaan: https://www.ag-grid.com/javascript-data-grid/column-properties/
            columnKeys: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone']
        }
        gridApi.exportDataAsCsv(params);
    };
    /**
     * Effect Hook https://reactjs.org/docs/hooks-effect.html
     * fetchData-funktio ensimmäisenä ja 
     * tyhjä [] toisena argumenttina 
     * efektin laukaisemiseksi komponentin rendatessa ensimmäisen kerran
     */
    useEffect(() => { dataFetcher(customersUrl, setCustomers) }, []);

    /**  
     * Jatkaa customer.js:stä importattua listaa, 
     * nämä kaksi saraketta [remove, edit] 
     * jätetty tänne koska tarvitsevat setCustomers propsin dataFetcher custom funktiolle
     */
    const columns = [...customerColumns,
        {  
            headerName: 'Remove customer', 
            field: 'links.0.href', 
            sortable: false, 
            filter: false, 
            width: 120,
            cellRendererFramework: params => (
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
                <EditCustomer id={params.value} setCustomers={setCustomers} />
            )
        },
    ];

    return (
        <Fragment>
            <AddCustomer setCustomers={setCustomers} />
            <Button onClick={() => onBtnExport()} size='small'> CSV customers</Button>
            <div className="ag-theme-alpine" style={{ height: 600, width: '80%', margin: 'auto', paddingTop: '80px'}}>
                <AgGridReact 
                    rowData={customers}
                    columnDefs={columns}
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
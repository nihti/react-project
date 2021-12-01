import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { BrowserRouter, Switch, Router, Routes, Route, Outlet, Link } from "react-router-dom";
import TrainingList from './TrainingList';
import { Button } from '@mui/material';
import Test from './Test';
import TrainingsListDialog from './TrainingsListDialog';
// import { Switch } from '@mui/material';


export default function CustomersList() {
    const [customers, setCustomers] = useState([]);

    /**
     * Effect Hook https://reactjs.org/docs/hooks-effect.html
     * 
     * fetchData-funktio ensimmäisenä ja 
     * tyhjä [] toisena argumenttina 
     * efektin laukaisemiseksi komponentin rendatessa ensimmäisen kerran
     */
    useEffect(() => { fetchData() }, []);

    // Hae kaikki asiakkaat
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(data => { setCustomers(data.content)} )
        .catch(err => console.error(err))
    }
    /**
     * Array(14) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, … ]
        0: Object { firstname: "John", lastname: "Johnson", streetaddress: "5th Street", … }
     */

    // Kaikille sarakkeille yhteiset arvot
    const defaultColDef = {
        sortable: true,
        filter: true,
        flex: 1
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
            headerName: 'Trainings',
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
        }
    ];

    return (
        <Fragment>
            <div className="ag-theme-alpine" style={{ height: 600, width: '80%', margin: 'auto', paddingTop: '80px'}}>
                <AgGridReact 
                    rowData={customers}
                    columnDefs={columns}
                    // Kaikille sarakkeille yhteiset arvot
                    defaultColDef={defaultColDef}
                />
            </div>
        </Fragment>
    );
}
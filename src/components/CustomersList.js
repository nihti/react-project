import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function CustomersList() {
    const [customers, setCustomers] = useState([]);
    const [trainings, setTrainings] = useState([]);

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

    return (
        <Fragment>
            <div className="ag-theme-alpine" style={{ height: 600, width: '80%', margin: 'auto', paddingTop: '80px'}}>
                <AgGridReact 
                    rowData={customers}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                />
            </div>
        </Fragment>
    );
}
import TrainingsListDialog from '../TrainingsListDialog';
// Yksittäisten komponenttien sijasta voidaan importata kaikki yhdestä tiedostosta
export { default as AddCustomer } from './AddCustomer';
export { default as EditCustomer } from './EditCustomer';
export { default as RemoveCustomer } from './RemoveCustomer';
export const customersUrl = 'https://customerrest.herokuapp.com/api/customers';
/** 
 * Sarakkeet, lista objekteja, käyttävät headerNamena fieldiään 
 * Field = JSON data attribuutin nimi, esim content.firstname 
 * */ 
export const customerColumns = [
    { field: 'firstname'                },
    { field: 'lastname'                 }, 
    { field: 'streetaddress'            },
    { field: 'postcode'                 },
    { field: 'city'                     },
    { field: 'email'                    },
    { field: 'phone'                    },
    { 
        headerName: 'Show trainings',
        field: 'links.0.href',
        sortable: false,
        filter: false,
        cellRendererFramework: params => (  
            <TrainingsListDialog trainings={params} />
        )
    }
];
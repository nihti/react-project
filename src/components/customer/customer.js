import TrainingsListDialog from '../TrainingsListDialog';
export { default as AddCustomer } from './AddCustomer';
export { default as EditCustomer } from './EditCustomer';
export { default as RemoveCustomer } from './RemoveCustomer';
export const customersUrl = 'https://customerrest.herokuapp.com/api/customers';
/** 
 * Varsinaiset sarakkeet, lista objekteja, käyttävät headerNamena fieldiään 
 * Field = JSON data attribuutin nimi, esim content.firstname 
 * */ 
export const customerColumns = [
    { field: 'firstname',       },
    { field: 'lastname'         }, 
    { field: 'streetaddress'    },
    { field: 'postcode'         },
    { field: 'city'             },
    { field: 'email'            },
    { field: 'phone'            },
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
    }
];
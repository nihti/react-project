import { Fragment, useEffect, useState, setState } from 'react';
import { TextField } from '@mui/material';
import { dataFetcher } from '../Services';
 
export default function CustomerField(props) {
    const url = props.params; 
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: ''
    });

    /**  
     * https://stackoverflow.com/a/60907638  
     * Ratkaisu console erroriin joka herjaa 
     * Can't perform a React state update on an unmounted component
     */
    let isMounted = true;

    const getCustomer = () => {
        fetch(url)
        .then(res => res.json())
        .then(data => { 
            if (isMounted) {
                setCustomer({
                    firstname: data.firstname,
                    lastname: data.lastname
                })
            }
        })
        .catch(err => console.error(err))
    }

    useEffect(() => { 
        getCustomer();
        return () => { isMounted = false }
    }, []); 
    
    return (
        <div style={{ display: 'flex', lineHeight: 1 }}>
            <p>{customer.firstname}</p>
            &nbsp;
            <p>{customer.lastname}</p>
        </div>
    );
}
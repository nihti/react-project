import Button from '@mui/material/Button';
import { dataFetcher } from '../../services/services';
import { customersUrl } from './customer';

export default function RemoveUser(props) {
    // Käyttäjän yksilöivä url
    const url = props.id;
    const removeUser = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, {method: 'DELETE'})
            .then(resp => {
                if (resp.ok) {
                    dataFetcher(customersUrl, props.setCustomers)
                    alert('User removed successfully');
                } else {
                    alert('Error')
                }
            })
            .catch(err => console.error(err));
        }
    }

    return (
        <Button 
            size="small"
            onClick={ () => removeUser(url) }
            color="error"
        >
        Remove
        </Button>
    );
}
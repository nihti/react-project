import Button from '@mui/material/Button';

export default function RemoveUser(props) {
    const url = props.id;
    // const updateCustomers() = props.fetchData;
    const removeUser = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, {method: 'DELETE'})
            .then(resp => {
                if (resp.ok) {
                    props.fetchData();
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
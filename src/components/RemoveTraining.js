import Button from '@mui/material/Button';

export default function RemoveTraining(props) {
    const url = props.url.href;
    const removeTraining = () => {
        if (window.confirm('Are you sure?')) {
            fetch(url, {method: 'DELETE'})
            .then(resp => {
                if (resp.ok) {
                    props.fetchTrainings();
                    alert('Training removed successfully')
                } else {
                    alert('Error')
                }
            })
            .catch(err => console.error(err));
        }
    }

    return (
        <Button size="small" onClick={removeTraining}>Remove</Button>
    );
}
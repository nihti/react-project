import './App.css';
import TopMenu from './components/TopMenu';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';

/**
 * Add Export functionality, that user can export all customers to a CSV file
 * Add calendar page where personal trainer can see all trainings (monthly, weekly, daily). See example screenshot.
 * Deploy your app to some cloud server
 */

export default function App() {

  const reset = () => {
    fetch('http://customerrest.herokuapp.com/reset', {
      method: 'POST'
    })
    .then(resp => {
      if (resp.ok) {
        alert('Kanta nollattu');
      } else {
        alert('Jokin meni vikaan')
      }
    })
    .catch(err => console.error(err));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
          <Button onClick={reset}>RESET</Button>
          <TopMenu />
      </div>
    </LocalizationProvider>
  );
}

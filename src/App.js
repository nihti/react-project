import './App.css';
import Menu from './components/Menu';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

/**
 * Add Export functionality, that user can export all customers to a CSV file
 * Add calendar page where personal trainer can see all trainings (monthly, weekly, daily). See example screenshot.
 * Deploy your app to some cloud server
 */

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <Menu />
      </div>
    </LocalizationProvider>
  );
}

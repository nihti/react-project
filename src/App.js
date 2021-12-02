import './App.css';
import TopMenu from './components/TopMenu';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
/** 
 * Task1
 * Create pages to list customers and trainings
 * List pages should contain following features:
 * - Sorting
 * - Searching
 * Note! You can use for example Dayjs or Date-fns libraries for date formatting 
 * 
 * TODO: 
 *  - Training sorting
 *  - Date formatting 
 */

/**
 * Task2 
 * Add following CRUD functions to the list pages
 * Add & Edit Customer
 * Delete existing customer (Add also yes/no confirmation dialog)
 * Add training to customer
 * Delete training (Add also yes/no confirmation dialog)
 */
export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
          <TopMenu />
      </div>
    </LocalizationProvider>
  );
}

// Hae kaikki asiakkaat
const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(res => res.json())
    .then(data => { setCustomers(data.content)} )
    .catch(err => console.error(err))
}
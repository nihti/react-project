export const defaultColDef = { sortable: true, filter: true, flex: 1 }
export const dataFetcher = (url, setter) => {
    fetch(url)
    .then(res => res.json())
    .then(data => { setter(data.content) })
    .catch(err => console.error(err))
}
// reset the app data 
export const reset = () => {
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
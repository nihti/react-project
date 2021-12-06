export const defaultColDef = { sortable: true, filter: true, flex: 1 }
export const dataFetcher = (url, setter) => {
    fetch(url)
    .then(res => res.json())
    .then(data => { setter(data.content)} )
    .catch(err => console.error(err))
}
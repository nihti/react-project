# Task 1 

> Create pages to list customers and trainings
> 
> List pages should contain following features:
> 
> - Sorting
> 
> - Searching
> 
> Note! You can use for example Dayjs or Date-fns libraries for date formatting 

## Uuden projektin luominen ja alkutoimet

Luodaan GitHubissa uusi repo [https://github.com/nihti/react-project](https://github.com/nihti/react-project) ja kloonataan se omalle koneelle:

`git clone https://github.com/nihti/react-project`

Mennään kloonattuun kansioon `\react-project` ja perustetaan projekti ([https://create-react-app.dev/](https://create-react-app.dev/)):

`npx create-react-app gym` 

Todetaan että olisi ollut varmaan fiksumpaa toimia päinvaistoin, luoda eka paikallinen projekti ja viedä se GitHubiin. Siirretään generoitu projekti GH:sta pullatun README.md:n kanssa samalle tasolle ja korvataan vanha README.md juuri generoidulla. Tuhotaan tyhjäksi jäänyt projetkikansio. Mennään terminaalissa projektin juureen ja testataan että luotu projekti toimii lokaalissa kehitysympäristössä: 

`yarn start`

Käytetään [Yarnia](https://classic.yarnpkg.com/en/) paketinhallintaohjelmana. Todetaan että kaikki toimii nätisti. Tehdään ensimäinen push GitHubiin, avataan toinen terminaalin välilehti projektin juuressa ja ajetaan:

```bash
# tarkasta missä branchissa ollaan (main)
git branch 
# lisää kaikki muutokset
git add .
# commit ja commit msg
git commit -m "initial commit"
# push GitHubiin
git push origin main 
```

Tarkastetaan GitHub ja sinne menneet muutokset, kaikki kuten pitääkin. 

## Asiakkaiden ja treenien listaaminen

Avataan PDF-tiedostona oleva API-dokumentaatio ja luetaan mistä data on haettavissa: 
[https://customerrest.herokuapp.com/api](https://customerrest.herokuapp.com/api)

> You can fetch all customers by calling /customers endpoint using the GET method.
> 
> You can fetch customer’s trainin gs by calling /customers/{id}/trainingsendpoint using the GET method. This link is also provided in customer JSON object (See the previous image _links.trainings).   

Luodaan ensin uusi kansio ja komponentti /components/CustomersList.js ja rendataan se App.js:ssä 

```JavaScript 
# uusi komponetti CustomersList.js
import React from 'react';
import { Fragment } from 'react';

export default function CustomersList() {
    return (
        <Fragment>
            <h2>hello</h2>
        </Fragment>
    );
}

# App.js
import './App.css';
import CustomersList from './components/CustomersList';

export default function App() {
  return (
    <div className="App">
      <CustomersList />
    </div>
  );
}
```

Asennetaan [MUI React-komponenttikirjasto](https://mui.com/) ja [Ag-grid React-taulukko](https://ag-grid.com/) datan esittämistä varten riippuvuuksina projektiin terminaalissa:

```bash
# ensin MUI
yarn add @mui/material @emotion/react @emotion/styled
# sitten Ag-grid
yarn add ag-grid-community ag-grid-react
```

Haetaan ensin asiakkaat. Data on osoitteessa https://customerrest.herokuapp.com/api/customers ja JSON-objektin content attribuutissa listana. 

```JavaScript
    // Hae kaikki asiakkaat
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
        console.log(customers)
    }
```

Sitten tarvitsemme asiakkaan kaikki treenit. Se saadaan datasta 

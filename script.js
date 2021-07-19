'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// premiere method of call
/*
const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open('Get', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send(); //we send the request , it fetches the api, and when it is completed
  // it sends the load event
  // and we listen to this emitted event
  //console.log(request.responseText);// dont get anything outside the event that listen to load emiited event
  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountry('lebanon');
getCountry('france');
getCountry('canada');
//getCountry('australia');*/

// const request = new XMLHttpRequest();
//   request.open('Get', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

const renderCountry = function (data, neighbour = '') {
  const html = `
    <article class="country ${neighbour}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderErrorr = function (err) {
  countriesContainer.insertAdjacentText('beforeend', err);
  countriesContainer.style.opacity = 1;
};
/*
//with console logs
// const getCountryData = function (country) {
//   const request = fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (result) {
//       console.log(result);
//       renderCountry(result[0]);
//     });
// };
const getJSON = function (url, errMessage = 'something went wrong') {
  return fetch(url).then(response => {
    console.log(response);

    if (!response.ok) throw new Error(`${errMessage} ${response.status}`);
    return response.json();
  });
};
//with arrow functions to see the difference and the simplifications
const getCountryData = function (country) {
  const request = getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'country Not Found!'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      //to throw an error
      //const neighbour = 'sdsdsd';
      if (!neighbour) throw new Error('no neighbour found!!');
      //https://restcountries.eu/rest/v2/alpha/{code}
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'neighbour not found!'
      );
    })
    .then(data => {
      console.log('neighbours: ', data);
      renderCountry(data, 'neighbour');
    })
    .catch(err => {
      console.error('errorr');
      renderErrorr(`something went wrong ${err.message} try again.`);
    })
    .finally(() => {
      // we use finally when we want to hide the spinner for example
      // no matter what the result is.
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`problem with GeoCoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`you are in ${data.city} , ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`${errMessage} ${res.status}`);
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => console.error(`${err.message}`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
//getCountryData('sdsd');

const lotteryPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('you win hehehe');
    } else {
      reject(new Error('you lost your money!'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

//promisifying a SetTimeOut
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2).then(() => {
  console.log('i waited for 2 seconds');
  return wait(1);
}).then(()=>{console.log('i waited for 1 seconds')})


end of 255 video
*/


//offloaded his wok to the background - to the webApis in the browser
// and move to the next line
//navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.error(err));

// here we have a callback based API
// we want to promisify , ya3ne to transform this callback based Api to 
// to promise based api

const getPosition = function () {
  return new Promise(function (resolve, reject) {// resolve hiyi medium to hold on data 
    // to be passed to the resolved function , and that is needed to be outside the resolve. to be used later

    // navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err));
    //also we can do the same:
    navigator.geolocation.getCurrentPosition(resolve, reject);

  });
}

//try this out:
//getPosition().then(pos => console.log(pos));
//now we have promisify the geolocation API from callback Api based to promises based Api

const whereAmI = function () {

  getPosition().then(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  })
    .then(res => {
      if (!res.ok) throw new Error(`problem with GeoCoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`you are in ${data.city} , ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`${errMessage} ${res.status}`);
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => console.error(`${err.message}`));
};


btn.addEventListener('click', whereAmI);


console.log('Getting position');
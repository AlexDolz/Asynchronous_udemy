'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, classname = '') {
  const html = ` <article class="country ${classname}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h class="country__region">${data.region}</h>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = ` <article class="country">
//   <img class="country__img" src="${data.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)}</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//   </div>
// </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('lithuania');
// getCountryData('germany');

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render country 1
    renderCountry(data);

    //Get neighbour country 2
    const neighbour = data.borders?.[0];

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('lithuania');
// getCountryAndNeighbour('usa');

//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

const request = fetch('https://restcountries.com/v2/name/portugal');

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => console.log(data));
//   renderCountry(data[0]);
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders?.[0];
//       const neighbour = 'shgsgdfs';
//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.log(`${err} 💣💣💣`);
//       renderError(`Something went wrong 💣💣💣 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
      // const neighbour = 'shgsgdfs';
      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(`${err} 💣💣💣`);
      renderError(`Something went wrong 💣💣💣 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => {
  getCountryData('portugal');
});

getCountryData('australia');

// Asynchronous Event Loop in practice
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolve promise 2').then(res => {
  for (let i = 0; i < 100000; i++) {}
  console.log(res);
});

console.log('Test end');

// Building a simple Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🎰');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🏆');
    } else {
      reject(new Error('You lost your money 💰'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

// Callback Hell
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Without Callback Hell
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

Promise.resolve('immediatelyResolve').then(x => console.log(x));
Promise.reject(new Error('Problem!')).then(x => console.error(x));

// Promisifying Geolocation API

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coord;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };

// btn.addEventListener('click', whereAmI);

// Consuming Promises with Async/Await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');
    // Exactly the same
    // fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res))
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong ${err.message}`);

    throw err;
  }
};

console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.log(`2: ${err.message}`))
//   .finally(() => console.log(`3: Finished getting location`));
// console.log('2: Finished getting location');

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.log(`2: ${err.message}`);
  }
  console.log(`3: Finished getting location`);
})();

console.log('FIRST');

// Error handling with try...catch

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

// Running promises in parallel

const get3Countries = async function (c1, c2, c3) {
  try {
    const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    // at the same time
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));

    console.log(data1.capital, data2.capital, data3.capital);
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

// race, allSettled, any

// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(0.1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

// Promise.any

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

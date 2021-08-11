const ip = document.querySelector('#ip');
const loc = document.querySelector('#location');
const timeZone = document.querySelector('#timeZone');
const isp = document.querySelector('#isp');
const btn = document.querySelector('#btn');

async function request() {
    const searchValue = document.querySelector('#search');
    try {
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_e6iOITdkVqVzLXCSCV88u71Pz86TD&ipAddress=${searchValue.value}`);
        const data = await response.json();
        ip.innerHTML = data.ip;
        loc.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
        timeZone.innerHTML = data.location.timezone;
        isp.innerHTML = data.isp;
        let lat = data.location.lat;
        let lng = data.location.lng;
        getMap(lat, lng);

    } catch (error) {
        console.log(error.message);
    }

}

document.forms[0].addEventListener('submite', e => {
    e.preventDefault();
    if (e.key === 'Enter' && !search.value == '') {
        request();
    } else {
        alert('Enter IP Adress')
    }
})


btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!search.value == '') {
        request();
    } else {
        alert('Enter IP Adress')
    }
})


function getMap(lat, lng) {
    document.getElementById('main').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
    let map = L.map('map', {
        center: [lat, lng],
        zoom: 13
    });
    L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`, {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let icon = L.icon({
        iconUrl: './images/icon-location.svg'
    })
    L.marker([lat, lng], { icon: icon }).addTo(map);
}



const apiBaseURL = 'https://mtzudo-ip-104-28-195-185.tunnelmole.net';

async function registerUser() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const response = await fetch(`${apiBaseURL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (response.ok) {
        Swal.fire('Success', result.message, 'success');
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    } else {
        Swal.fire('Error', result.error, 'error');
    }
}

async function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch(`${apiBaseURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (response.ok) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('flights-section').style.display = 'block';
        document.getElementById('booking-section').style.display = 'block';
        document.getElementById('logout-button').style.display = 'block';
        Swal.fire('Success', result.message, 'success');
        loadFlights();
    } else {
        Swal.fire('Error', result.error, 'error');
    }
}

async function logoutUser() {
    await fetch(`${apiBaseURL}/logout`, { method: 'POST' });
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'block';
    document.getElementById('flights-section').style.display = 'none';
    document.getElementById('booking-section').style.display = 'none';
    document.getElementById('logout-button').style.display = 'none';
    Swal.fire('Logged out', '', 'info');
}

async function loadFlights() {
    const response = await fetch(`${apiBaseURL}/flights`);
    const flights = await response.json();
    const flightList = document.getElementById('flight-list');
    flightList.innerHTML = flights.map(flight => `
        <div>
            <strong>${flight.flight_number}</strong>: ${flight.destination} at ${flight.departure_time}
        </div>
    `).join('');
}

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await registerUser();
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await loginUser();
});

document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const flightNumber = document.getElementById('flight-number').value;
    const response = await fetch(`${apiBaseURL}/book-flight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flight_number: flightNumber })
    });
    const result = await response.json();
    if (response.ok) {
        Swal.fire('Success', result.message, 'success');
        loadFlights();
    } else {
        Swal.fire('Error', result.error, 'error');
    }
});

document.getElementById('logout-button').addEventListener('click', logoutUser);

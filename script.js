function fetchRandomUser() {
    return fetch('https://randomuser.me/api')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.results[0])
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function createUserCards(numberOfUsers) {
    const userPromises = [];

    for (let i = 0; i < numberOfUsers; i++) {
        userPromises.push(fetchRandomUser());
    }

    Promise.all(userPromises)
        .then(users => {
            const userCardsHTML = users.map(user => `
                <div class="user-card">
                    <img src="${user.picture.large}" alt="User Picture width="128" height="128""/>
                    <p>Name: ${user.name.first} ${user.name.last}</p>
                    <p>Cell: ${user.cell}</p>
                    <p>City: ${user.location.city}</p>
                    <p>Postcode: ${user.location.postcode}</p>
                    <p>Email: ${user.email.replace(/@example\.com$/, '')}</p>
                </div>
            `).join('');
            document.getElementById('user-info').innerHTML = userCardsHTML;
        })
        .catch(error => {
            console.error('Error creating user cards:', error);
        });
}

createUserCards(7);
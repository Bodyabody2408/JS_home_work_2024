document.addEventListener('DOMContentLoaded', function() {
    const userDetailsContainer = document.getElementById('userDetailsContainer');
    const userId = new URLSearchParams(window.location.search).get('userId');

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            const userDetailBlock = document.createElement('div');
            userDetailBlock.classList.add('user-details-block');

            const userInfoList = document.createElement('ul'); // Створюємо елемент <ul>

            const userProperties = [
                { label: 'ID', value: user.id },
                { label: 'Name', value: user.name },
                { label: 'Username', value: user.username },
                { label: 'Email', value: user.email },
                { label: 'Address', value: `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}` },
                { label: 'Geo', value: `${user.address.geo.lat}, ${user.address.geo.lng}` },
                { label: 'Phone', value: user.phone },
                { label: 'Website', value: user.website },
                { label: 'Company', value: `${user.company.name}, ${user.company.catchPhrase}, ${user.company.bs}` }
                // Додайте решту показників, які вам потрібні
            ];

            // Додаємо кожну властивість до списку
            userProperties.forEach(property => {
                const listItem = document.createElement('li');
                listItem.innerText = `${property.label}: ${property.value}`;
                userInfoList.appendChild(listItem);
            });

            const postsButton = document.createElement('a');
            postsButton.href = `posts.html?userId=${user.id}`;
            postsButton.innerText = 'Posts of Current User';

            userDetailBlock.appendChild(userInfoList);
            userDetailBlock.appendChild(postsButton);

            userDetailsContainer.appendChild(userDetailBlock);
        })
        .catch(error => console.error('Error fetching user details:', error));
});

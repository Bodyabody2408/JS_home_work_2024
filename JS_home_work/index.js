document.addEventListener('DOMContentLoaded', function() {
    const userContainer = document.getElementById('userContainer');

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            for (const user of users) {
                const userBlock = document.createElement('div');
                userBlock.classList.add('user-block');

                const userInfo = document.createElement('p');
                userInfo.innerText = `ID: ${user.id}, Name: ${user.name}`;

                const detailsButton = document.createElement('a');
                detailsButton.href = `user-details.html?userId=${user.id}`;
                detailsButton.innerText = 'Details';

                userBlock.appendChild(userInfo);
                userBlock.appendChild(detailsButton);

                userContainer.appendChild(userBlock);
            }
        })
        .catch(error => console.error('Error fetching users:', error));
});

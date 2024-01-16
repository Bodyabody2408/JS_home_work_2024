document.addEventListener('DOMContentLoaded', function() {
    const userPostsContainer = document.getElementById('userPostsContainer');
    const userId = new URLSearchParams(window.location.search).get('userId');

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
            for (let i = 0; i < posts.length; i++) {
                const post = posts[i];

                const postTitleBlock = document.createElement('div');
                postTitleBlock.classList.add('post-title-block');

                const postTitle = document.createElement('p');
                postTitle.innerText = `TITLE: ${post.title}`;

                const postDetailsButton = document.createElement('a');
                postDetailsButton.href = `post-details.html?postId=${post.id}`;
                postDetailsButton.innerText = 'Post Details';

                postTitleBlock.appendChild(postTitle);
                postTitleBlock.appendChild(postDetailsButton);
                userPostsContainer.appendChild(postTitleBlock);

                // Додати клас 'new-row' кожному п'ятому блоку для розділення на рядки
                if ((i + 1) % 5 === 0) {
                    postTitleBlock.classList.add('new-row');
                }
            }
        })
        .catch(error => console.error('Error fetching user details:', error));
});

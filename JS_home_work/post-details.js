document.addEventListener('DOMContentLoaded', function() {
    const postDetailsContainer = document.getElementById('postDetailsContainer');
    const postCommentsContainer = document.getElementById('postCommentsContainer');
    const postId = new URLSearchParams(window.location.search).get('postId');

    if (!postId) {
        console.error('Post ID is missing in the URL');
        return;
    }

    // Fetch post details
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch post details');
            }
            return response.json();
        })
        .then(post => {
            const postDetailBlock = document.createElement('div');
            postDetailBlock.classList.add('post-details-block');

            const postInfo = document.createElement('p');
            postInfo.innerText = `ID: ${post.id}, Title: ${post.title}, Body: ${post.body}`;

            postDetailBlock.appendChild(postInfo);
            postDetailsContainer.appendChild(postDetailBlock);

            // Fetch comments for the post
            return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch post comments');
            }
            return response.json();
        })
        .then(comments => {
            for (const comment of comments) {
                const commentBlock = document.createElement('div');
                commentBlock.classList.add('comment-block');

                const commentInfo = document.createElement('p');
                commentInfo.innerText = `ID: ${comment.id}, Name: ${comment.name}, Email: ${comment.email}, Body: ${comment.body}`;

                commentBlock.appendChild(commentInfo);
                postCommentsContainer.appendChild(commentBlock);
            }
        })
        .catch(error => console.error(error.message));
});

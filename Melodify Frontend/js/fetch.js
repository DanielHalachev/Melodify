function fetchPlaylists() {
    redirectToLoginIfInvalidCredentials();
    const token = getToken();
    const userId = getUserId();

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const user = JSON.parse(xhr.responseText);
                console.log(user);
                document.querySelector("#account img").src = user.image;

                const playlists = user.playlists;
                const libraryItems = document.querySelector('#library .items');

                libraryItems.innerHTML = "";

                if (playlists.length === 0) {
                    libraryItems.innerHTML = "You have no playlists";
                }

                playlists.forEach(playlist => {
                    const item = document.createElement('div');
                    item.classList.add('item');

                    const itemImageContainer = document.createElement('div');
                    itemImageContainer.classList.add("image-container");

                    const overflowDiv = document.createElement('div');
                    overflowDiv.onclick = function () {
                        playPlaylist(playlist.id);
                    };

                    const span = document.createElement('span');
                    span.classList.add('fa');
                    span.classList.add('fa-circle-play');

                    const img = document.createElement('img');
                    img.src = playlist.image;

                    const info = document.createElement('div');
                    info.classList.add('info');

                    const name = document.createElement('button');
                    name.classList.add('name');
                    name.classList.add('a');
                    name.textContent = playlist.name;
                    // name.href = playlist.uri;
                    name.onclick = function () {
                        navigate(playlist.uri, false);
                    };

                    const author = document.createElement('p');
                    author.classList.add('author');
                    author.textContent = user.name;

                    info.appendChild(name);
                    info.appendChild(author);
                    overflowDiv.appendChild(span);
                    itemImageContainer.appendChild(img);
                    itemImageContainer.appendChild(overflowDiv);
                    item.appendChild(itemImageContainer);
                    item.appendChild(info);
                    libraryItems.appendChild(item);
                });
            } else {
                const libraryItems = document.querySelector('#library .items');
                libraryItems.innerHTML = "We couldn't fetch your playlists. ";
                console.log("Error fetching playlists: " + xhr.status);
            }
        }
    };

    xhr.open('GET', `/api/users/${userId}`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

function fetchQueue() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const queues = JSON.parse(xhr.responseText);
                const queue = queues[0];

                backwardButton.disabled = false;
                playButton.disabled = false;
                forwardButton.disabled = false;

                const queueItems = document.querySelector('#queue .items');

                queueItems.innerHTML = "";

                if (queue.currentSongIndex === 0) {
                    backwardButton.disabled = true;
                }

                if (queue.songs.length === queue.currentSongIndex + 1) {
                    forwardButton.disabled = true;
                }

                if (queue.songs.length === 0) {
                    document.querySelector("#track_info .name").textContent = "No Song Playing";
                    document.querySelector("#track_info .author").textContent = "";
                    document.querySelector("#track_info img").src = "";
                    backwardButton.disabled = true;
                    forwardButton.disabled = true;
                    playButton.disabled = true;
                    return;
                }

                if (queue.songs.length === queue.currentSongIndex) {
                    document.querySelector("#track_info .name").textContent = "No Song Playing";
                    document.querySelector("#track_info .author").textContent = "";
                    document.querySelector("#track_info img").src = "";
                    forwardButton.disabled = true;
                    return;
                }

                document.querySelector("#track_info .name").textContent = queue.songs[queue.currentSongIndex].name;
                document.querySelector("#track_info .author").textContent = queue.songs[queue.currentSongIndex].album_name;
                document.querySelector("#track_info img").src = queue.songs[queue.currentSongIndex].album_image;

                queue.songs.slice(queue.currentSongIndex + 1).forEach(song => {
                    const item = document.createElement('div');
                    item.classList.add('item');

                    const img = document.createElement('img');
                    img.src = song.album_image;

                    const info = document.createElement('div');
                    info.classList.add('info');

                    const name = document.createElement('p');
                    name.classList.add('name');
                    name.textContent = song.name;

                    const author = document.createElement('p');
                    author.classList.add('author');
                    author.textContent = song.album;

                    info.appendChild(name);
                    info.appendChild(author);
                    item.appendChild(img);
                    item.appendChild(info);
                    queueItems.appendChild(item);

                    console.log(`Queue fetched: ${queue.currentSongIndex}`);
                });
            } else {
                console.log("Error fetching queue: " + xhr.status);
                const libraryItems = document.querySelector('#queue .items');
                libraryItems.innerHTML = "We couldn't fetch your queue. ";
            }
        }
    };

    xhr.open('GET', 'http://localhost:8080/api/queues', true);
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

fetchPlaylists();
currentSong(false);
fetchQueue();

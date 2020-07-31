import {
    getResources,
    postData
} from './serverCommand.js';

window.addEventListener('DOMContentLoaded', () => {
    const leaderboard = document.querySelector('.content__rating');
    const uniqePlayers = [];

    function getName(player) {
        return player.playerName.toLowerCase();
    }

    function checkUniqueness(item) {
        if (uniqePlayers.length === 0) {
            uniqePlayers.push(getName(item));
            return true;
        } else if (uniqePlayers.indexOf(getName(item)) !== -1) {
            return false;
        } else {
            uniqePlayers.push(getName(item));
            return true;
        }

    }

    getResources('http://localhost:3000/leaderboard')
        .then(data => {
            return JSON.parse(JSON.stringify(data)) //JSON.parse(JSON.stringify(data)
                .sort((a, b) => b.score - a.score)
                .filter((player, i, arr) => checkUniqueness(player));

        })
        .then(data => {
            data.forEach(({
                playerName,
                time,
                score
            }, i) => {
                leaderboard.innerHTML += `
                <div class="content__td">${i + 1}</div>
                <div class="content__td nickname">${playerName}</div>
                <div class="content__td time">${time}</div>
                <div class="content__td">${score}</div>
                `;
            });
            // postData('http://localhost:3000/leaderboard', data);
        });
});
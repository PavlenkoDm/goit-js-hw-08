import Player from '@vimeo/player';
import trottle from 'lodash.throttle';

const STOR_KEY = "videoplayer-current-time";
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
let time = Number(localStorage.getItem(STOR_KEY));

console.log(time);

player.setCurrentTime(time).then(function(seconds) {
    //seconds = Number(localStorage.getItem("videoplayer-current-time"));
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

player.on('timeupdate', trottle(onUpdateTime, 1000));


// ----Handlers------------------------------------------------
function onUpdateTime(data) {
    try {
        localStorage.setItem(STOR_KEY, JSON.stringify(data.seconds));
    } catch (error) {
        console.error("Set state error: ", error.message);
    }    
}
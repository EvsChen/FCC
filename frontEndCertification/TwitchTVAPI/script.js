/**
 * Created by elvischen on 14/03/2017.
 */

var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var offline = [];
var frame = document.getElementById("frame");


function init() {
    for (let i in streamers){
        loadStreamers(streamers[i]);
    }

}

function loadStreamers (name) {
    var url = 'https://wind-bow.glitch.me/twitch-api/streams/' + name;
    var request = new XMLHttpRequest();
    request.open('GET',url, true);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            var first = document.getElementsByClassName("item")[0];
            var data = JSON.parse(this.response);
            if (data.stream !== null){
                let channel =data.stream.channel;
                let name = channel.name;
                let logo = channel.logo;
                let status = channel.status;
                let banner = channel.profile_banner;
                let link = channel.url;
                let newdiv = document.createElement("div");
                newdiv.className = "item online";
                newdiv.innerHTML = `
                    <img alt="" src="${banner}" class="backimg">
                    <a href="${link}" class="name">${name}</a>
                    <span class="intro">${status}</span>
             `;
                    frame.insertBefore(newdiv,first);
            }
            else {
                let newdiv = document.createElement("div");
                newdiv.className = "item";
                newdiv.innerHTML = `
                    <a href="null" class="name">${name}</a>
                    <span class="intro">Offline</span>
             `;
                frame.appendChild(newdiv);
            }
        }
        else {
            // We reached our target server, but it returned an error
        }
    };
    request.onerror = function() {
        // There was a connection error of some sort
    };
    request.send();
}
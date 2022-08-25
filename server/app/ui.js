/* eslint-disable no-console */
/* eslint-disable import/extensions */

import gConfig from './config/graphConfig.js';

// Select DOM elements to work with
const bannerImg = document.getElementById('banner');
const welcomeDiv = document.getElementById('WelcomeMessage');
const signInButton = document.getElementById('SignIn');
const signOutButton = document.getElementById('SignOut');
const cardDiv = document.getElementById('card-div');
const profileButton = document.getElementById('uiShowProfile');
const profileDiv = document.getElementById('profile-div');
const readListButton = document.getElementById('uiShowList');
const listDiv = document.getElementById('colorlist-div');

function showWelcomeMessage(username) {
    // Reconfiguring DOM elements
    cardDiv.style.display = 'initial';
    welcomeDiv.innerHTML = `Welcome ${username}`;
    signInButton.setAttribute('disabled', '');
    signOutButton.removeAttribute('disabled');
    bannerImg.src = './images/banner_connected.png';
}

function update(data, endpoint) {
    const date = new Date().toString();

    console.log(`Graph API responded at: ${date}`);

    if (endpoint === gConfig.meEndpoint) {
        profileDiv.innerHTML = '';
        const email = document.createElement('p');
        email.innerHTML = `<strong>Mail: </strong>${data.mail}`;
        const phone = document.createElement('p');
        phone.innerHTML = `<strong>Phone: </strong>${data.businessPhones[0]}`;
        const address = document.createElement('p');
        address.innerHTML = `<strong>Location: </strong>${data.officeLocation}`;
        profileDiv.appendChild(email);
        profileDiv.appendChild(phone);
        profileDiv.appendChild(address);
    } else if (endpoint === gConfig.colorListMetaEndpoint) {
        console.log(data);
        listDiv.innerHTML = '';
        const title = document.createElement('p');
        title.innerHTML = `${data.displayName}, ${date}`;
        listDiv.appendChild(title);
    }
}

export {
    signInButton,
    signOutButton,
    profileButton,
    readListButton,
    showWelcomeMessage,
    update,
};

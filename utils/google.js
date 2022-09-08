const fs = require('fs');
const { google } = require('googleapis');
const axios = require('axios');

const oauth2Client = new google.auth.OAuth2(
    config.google.clientID,
    config.google.clientSecret,
    "https://forms.imidnight.dev/auth/google/callback"
);

module.exports = async (config, app, code) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
        .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokens.id_token}`,
                },
            },
        )
        .then(res => res.data)
        .catch(error => {
            throw new Error(error.message);
        });

    return googleUser;
}

module.exports.getGoogleUrl = () => {
    return oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ],
    })
}
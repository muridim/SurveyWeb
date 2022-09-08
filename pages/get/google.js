module.exports = function (config, app) {
    app.get('/auth/google/callback', async function (req, res, next) {
        console.log(req.query.code)
        const code = req.query?.code;

        if (!code) return console.log('No code provided');

        const gUser = await require('../../utils/google')(config, app, code);

        if (!gUser) return console.log('No user provided');

        console.log(gUser);

        const { email, name, picture } = gUser;

        const user = await config.schemas.User.findOne({ email });

        if (user) req.session.user = {
            email: user.email,
            username: user.given_name,
            name: user.name
        } 
        else {
            const newUser = await config.schemas.User.create({
                email,
                name,
                lastName: family_name,
                firstName: given_name,
                pfp: picture,
                username,
                connections: {
                    google: true
                }
            });

            req.session.user = {
                email: newUser.email,
                username: newUser.given_name,
                name: newUser.name
            };
        }

        return res.redirect('/');
    });
}
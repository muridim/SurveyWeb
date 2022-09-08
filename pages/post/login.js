module.exports = function (config, app) {
    app.route({
        method: 'POST',
        url: '/account/login',
        preHandler: function (req, res, next) {
            if (req.session?.user) return res.redirect('/');

            next()
        },
        handler: async function (req, res) {
            console.log(req.body);

            const { email, username, password } = req.body

            if (!email || !username || !password) return res.send({ error: true, message: 'Invalid email or password' });

            const user = await config.schemas.User.findOne({
                email,
                username,
            });

            if (!user.comparePassword(password)) return res.send({ error: true, message: 'Invalid email or password' });

            req.session.user = {
                email: user.email,
                username: user.username,
                name: user.name
            };

            res.send({ error: false, message: 'Logged in' });
        }
    });
};
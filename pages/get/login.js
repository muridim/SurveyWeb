module.exports = function (config, app) {
    app.route({
        method: 'GET',
        url: '/login',
        preHandler: function (req, res, next) {
            if (req.session?.user) return res.redirect('/')

            next()
        },
        handler: function (req, res) {
            res.render('login', {req, res, config})
        }
    })
}

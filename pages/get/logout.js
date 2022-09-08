module.exports = function (config, app) {
    app.route({
        method: 'GET',
        url: '/logout',
        preHandler: function (req, res, next) {
            if (!req.session?.user) return res.redirect('/')

            next()
        },
        handler: function (req, res) {
            req.session.destroy()
            res.redirect('/')
        }
    })
}
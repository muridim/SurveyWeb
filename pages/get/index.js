module.exports = function (config, app) {
    app.route({
        method: 'GET',
        url: '/',
        preHandler: function (req, res, next) {
            // do something
            next()
        },
        handler: function (req, res) {
            console.log(req.session?.user)


            res.render('index', {req, res})
        }
    })
}

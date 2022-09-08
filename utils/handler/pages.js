const fs = require('fs');

module.exports = (config, app) => {
    fs.readdirSync(`${__dirname}/../../pages`)
        .forEach((folder) => {
            fs.readdirSync(`${__dirname}/../../pages/${folder}`)
                .forEach((file) => {
                    require(`${__dirname}/../../pages/${folder}/${file}`)(config, app)
        });
    });
}
const { join } = require('path');

module.exports = {
    plugins: {
        "@tailwindcss/postcss": {},
        // tailwindcss: {
        //     config: join(__dirname, "tailwind.config.js"),
        // },
        autoprefixer: {},
    },
};

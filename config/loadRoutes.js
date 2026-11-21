const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    const routesPath = path.join(__dirname, '../routes');

    function loadRoutes(dir) {
        fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                loadRoutes(fullPath);
                return;
            }

            if (entry.isFile() && entry.name.endsWith('.js')) {
                const route = require(fullPath);

                if (typeof route === 'function') {
                    app.use(route);
                    console.log(`Loaded route: ${path.relative(routesPath, fullPath)}`);
                } else {
                    console.warn(`Skipping invalid route: ${fullPath}`);
                }
            }
        });
    }

    loadRoutes(routesPath);
};
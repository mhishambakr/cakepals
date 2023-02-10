const authRoutes = require('./Auth/Auth.routes');

module.exports = (app,base) => {
    app.use(`${base}/auth`, authRoutes);
}

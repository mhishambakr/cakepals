const authRoutes = require('./Auth/Auth.routes');
const productRoutes = require('./Product/Product.routes');
const bakerRoutes = require('./Baker/Baker.routes');

module.exports = (app,base) => {
    app.use(`${base}/auth`, authRoutes);
    app.use(`${base}/product`, productRoutes);
    app.use(`${base}/baker`, bakerRoutes);
}

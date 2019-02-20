var controller = require('./controller');

module.exports = function(app) {
    app.get('/', controller.index);
    app.get('/view1', controller.view1);
    app.get('/view2', controller.view2);
    app.get('/view3', controller.view3);

}
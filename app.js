const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const expressHbs = require('express-handlebars');

const app = express();

app.engine('handlebars', expressHbs());

app.set('view engine', 'handlebars');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);

app.use(shopRoutes);

app.use((req, res) => {
	res.status(404).render('404', { title: '404 Page not found' });
});

app.listen(3000);

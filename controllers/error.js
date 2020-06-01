exports.get404Page = (req, res) => {
	res.status(404).render('404', { pageTitle: '404 Page not found', path: '' });
};

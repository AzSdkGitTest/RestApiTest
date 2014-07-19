
/*
 * GET home page.
 */

exports.deserialize= function(req, res){
  res.render('deserialize', { type: req.params['type'], value: req.params['value'] });
};
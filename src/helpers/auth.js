const helpers = {};

helpers.OnSession = function(req,res,next){
  if(req.isAuthenticated()){
    next();
  } else{
    req.flash('err', 'Debes iniciar sessión.');
    res.redirect('/login');
  }
};

helpers.OffSession = function(req,res,next){
  if(!req.isAuthenticated()){
    next();
  } else{
    req.flash('err', 'No puedes visitar esa pagina.');
    res.redirect('/note');
  }
};

module.exports = helpers;

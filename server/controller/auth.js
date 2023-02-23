const passport = require('passport');

const User = require('../model/user');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// exports.login = async(req, res)=>{
//     try{
//         console.log("ffffff----------");
//         console.log(req.body.email);
//         const loginUser = await User.loginUser({email: req.body.email}, req.body.password);
//         console.log("sdsfdfddfgr");
//         if(loginUser){
//             passport.authenticate("local")(req, res, function(){
//                 res.redirect("/contactlist");
//             });
//         }else{
//             res.redirect("/login");
//         }
//     }catch(err){
//         console.log("sdsdsd----------");
//         res.send(err);
//     }
// };

exports.login = (req, res, next)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    req.login(user, (err)=>{
        if(err){
            console.log(err)
        }else{
            passport.authenticate('local', function(err, user, info) {
                if (err) { return next(err); }
                if (!req.user) { return res.redirect('/login'); }
                req.logIn(req.user, function(err) {
                  if (err) { return next(err); }
                  return res.redirect('/contactlist');
                });
              })(req, res, next);
        }
    });
};

exports.logout = (req, res, next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};

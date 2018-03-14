module.exports = function (req, res, next) {
   if(!req.body.publisher_id) {
       return  res.body.publisher_id =null;
   }
    next();
};
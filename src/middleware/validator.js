const validator = (req, res, next) => {

    const id = req.query.id;
    if(!id) { next('Error: no ID.'); }
    else { next(); }
}

module.exports = validator;

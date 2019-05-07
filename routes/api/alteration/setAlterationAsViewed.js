const Alteration = require('../../../models/Alteration');

const setAlterationAsViewed = (req, res) => {
  const alterationId = req.query.alterationId;
  Alteration.findOne({ alterationId }).then(alteration => {
    if (alteration) {
      if (alteration.status === 'WAITING') {
        alteration.set({ status: 'VIEWED' });
        alteration
          .save()
          .then(() => res.status(200))
          .catch(err => {
            console.log(err);
            return res.status(400);
          });
      }
    }
    return res.status(400);
  });
};

module.exports = setAlterationAsViewed;

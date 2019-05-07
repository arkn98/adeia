const crypto = require('crypto');
const path = require('path');
const User = require('../../models/User');
const Leave = require('../../models/Leave');
const { accountTypes } = require('../../models/User');

const fileDownloadHandler = (req, res) => {
  const { token, leaveId } = req.query;
  if (token) {
    let hash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    User.findOne({ OTToken: hash }).then(user => {
      if (!user) {
        return res.status(403);
      }
      Leave.findOne({ leaveId }).then(leave => {
        if (leave) {
          let isApplier = false;
          if (user._id.equals(leave.staff)) {
            isApplier = true;
          }
          if (
            user.accountType === accountTypes.ADMIN ||
            user.accountType === accountTypes.OFFICE ||
            isApplier
          ) {
            res.sendFile(
              path.join(__dirname, '../../uploads', leave.document),
              function(err) {
                if (err) {
                  console.log(err);
                }
              }
            );
          } else {
            return res.status(403);
          }
        }
      });
    });
  } else {
    return res.status(403);
  }
};

module.exports = fileDownloadHandler;

const Leave = require('../../models/Leave');
const { leaveStatuses } = require('../../data');

const setLeaveStatusBasedOnAlt = leaveId => {
  return new Promise((resolve, reject) => {
    Leave.findOne({ leaveId }).then(() => {
      if (leave) {
        let status = leave.status;
        if (leave.alterations.some(x => x.status === 'REJECTED')) {
          status = leaveStatuses.REJECTEDBYALT;
        } else if (leave.alterations.every(x => x.status === 'ACCEPTED')) {
          status = leaveStatuses.WAITINGHODAPPROVAL;
        }
        leave.set({ status }).then(() => resolve());
      }
    });
  });
};

module.exports = setLeaveStatusBasedOnAlt;

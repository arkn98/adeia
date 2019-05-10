import axios from 'axios';

const leaveAcceptRejectHOD = (data = [], status) => dispatch => {
  return new Promise((resolve, reject) => {
    if (status === 'ACCEPT') {
      axios
        .post('/api/leave/accept-hod', { data })
        .then(res => {
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    } else if (status === 'REJECT') {
      axios
        .post('/api/leave/reject-hod', { data })
        .then(res => {
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    } else {
      resolve();
    }
  });
};

export default leaveAcceptRejectHOD;

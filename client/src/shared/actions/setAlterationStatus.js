import axios from 'axios';

const setAlterationStatus = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/alteration/set-${data.status.toLowerCase()}`, {
        params: {
          alterationId: data.alterationId
        }
      })
      .then(res => {
        resolve();
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
};

export default setAlterationStatus;

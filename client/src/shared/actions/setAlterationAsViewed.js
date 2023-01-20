import axios from 'axios';

const setAlterationAsViewed = alterationId => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/alteration/set-as-viewed', {
        params: {
          alterationId
        }
      })
      .then(res => resolve())
      .catch(err => {
        console.log(err);
        reject();
      });
  });
};

export default setAlterationAsViewed;

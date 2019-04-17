import axios from 'axios';

const checkDB = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/utils/check-db')
      .then(res => {
        if (res.data.status === 1) resolve(true);
        else resolve(false);
      })
      .then(err => reject(false));
  });
};

export default checkDB;

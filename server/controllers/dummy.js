import client from '../db/index.js';

export const getDummyData = async (req, res) => {
  client.query('SELECT version();', (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err);
    }
  });
  // eslint-disable-next-line no-unused-expressions
  client.end;
};

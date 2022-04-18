import client from '../db/index.js';
import logger from '../logger/index.js';

export const getColumnName = (req, res) => {
  // {
  //   Header: 'Last Name',
  //   accessor: (d) => d.node_number,
  // },
  const sql = `select * from `;
  try {
    client.query(sql, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        logger.error('getFullNodeMainData Error', err);
      }
    });
    // eslint-disable-next-line no-unused-expressions
    client.end;
  } catch (error) {
    logger.error('getFullNodeMainData Error', err);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
};

export const getFullNodeMainData = (req, res) => {
  const sql = `SELECT * FROM master_node;`;

  try {
    client.query(sql, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        logger.error('getFullNodeMainData Error', err);
      }
    });
    // eslint-disable-next-line no-unused-expressions
    client.end;
  } catch (error) {
    logger.error('getFullNodeMainData Error', err);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
};

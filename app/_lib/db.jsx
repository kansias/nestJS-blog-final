import { createPool } from "mysql2";

// const pool = createPool({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "metadb",
//   port: 3306,
//   connectionLimit: 10,
// });

const pool = createPool({
  host: "203.232.215.31",
  user: "aicompany",
  password: "aico2020!",
  database: "metadb",
  port: 3306,
  connectionLimit: 10,
});

pool.getConnection((err, conn) => {
  if (err) console.log("Error connecting to db...");
  else console.log("Connected to db...!");
  conn.release(); // 연결 해제
});

const executeQuery = (query, arrParams) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arrParams, (err, data) => {
        if (err) {
          console.log("Error in executing the query");
          reject(err);
        }
        console.log("------db.jsx------");
        //console.log(data)
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default executeQuery;

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "minio",
  host: "postgresql-minio.alwaysdata.net",
  database: "minio_organize_app",
  password: "adminroot",
  port: 5432,
});

module.exports = pool;

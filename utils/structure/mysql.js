const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME, // It's required to have a database
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const query = async (sql, params) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [results, fields] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {
    query,
};
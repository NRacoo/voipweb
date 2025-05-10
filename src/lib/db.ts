import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "kamailio",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "kamailio",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}

const pool = mysql.createPool(dbConfig);

export async function query(sql: string, params: any[] = []) {
    try {
        const [results] = await pool.execute(sql, params)
        return results;
    }catch(error){
        console.error("Database query error:", error);
        throw error;
    }
}

export async function testConnection() {
    try{
        const connection = await pool.getConnection();
        console.log("Database connection successful");
        connection.release();
        return true;
    }catch(error){
        console.error("Databse connection error:", error);
        return false;
    }
}

export async function getSubscriber(username: string){
    const sql = `
    SELECT id, username, domain, password, ha1, ha1b
    FROM subscriber
    WHERE username = ?
    `
    return query(sql, [username])
}

export async function addSubscriber(username: string, domain:string, password:string){
    const ha1 = require("crypto").createHash("md5").update(`${username}:${domain}:${password}`).digest("hex")
    const ha1b = require("crypto").createHash("md5").update(`${username}@$(domain):${domain}:${password}`).digest("hex")

    const sql = `
    INSERT INTO subscriber (username, domain, password, ha1, ha1b)
    VALUES (?, ?, ?, ?, ?)`

    return query(sql, [username, domain, password, ha1, ha1b])
}

//di kamailio harus table acc nya diisi kolom src_user atau dst_user
export async function getCallLogs(username:string){
    const sql = `
    SELECT * FROM acc
    WHERE (src_user = ? OR dst_user = ?)
    ORDER BY TIME DESC
    LIMIT 50`
    return query(sql, [username, username])
}



export async function updatePassword(username: string, domain: string, newPassword: string) {
  // Generate new HA1 and HA1B hashes
    const ha1 = require("crypto").createHash("md5").update(`${username}:${domain}:${newPassword}`).digest("hex")
    const ha1b = require("crypto")
        .createHash("md5")
        .update(`${username}@${domain}:${domain}:${newPassword}`)
        .digest("hex")

    const sql = `
        UPDATE subscriber
        SET password = ?, ha1 = ?, ha1b = ?
        WHERE username = ? AND domain = ?
    `

    return query(sql, [newPassword, ha1, ha1b, username, domain])
}

//nambah si subscriber

export async function updateSubscriber (username: string, domain: string, newPassword: string){
    const ha1 = require("crypto").createHash("md5").update(`${username}:${domain}:${newPassword}`).digest("hex")
    const ha1b = require("crypto").createHash("md5").update(`${username}@${domain}:${domain}:${newPassword}`).digest("hex")

    const sql = `
    UPDATE subscriber
    set password = ?, ha1 = ?, ha1b = ?
    WHERE username = ? AND domain = ?
    `

    return query(sql, [newPassword, ha1, ha1b, username, domain])
}

//hapus subscriber
export async function deleteSubscriber(username: string, domain: string) {
    const sql = `
    DELETE FROM subscriber
    WHERE username = ? AND domain = ?
    `

    return query(sql, [username, domain])
}
/**
 * Vercel Serverless Function
 * /api/girls endpoint
 */
import mysql from 'mysql2'

export function getCreatedConnection() {
    return mysql.createConnection({
        host: process.env.MYSQL_HOST || "localhost",
        port: +process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASS || "",
        database: process.env.MYSQL_DBNAME || "girlsdb"
    })
}

export default async function handler(req, res) {
    let conn = null

    switch (req.method) {
        case "GET":
            conn = getCreatedConnection()
            conn.query("SELECT * FROM girls", (error, result, fields)=>{
                conn.destroy()
                if (error) {
                    console.warn(error)
                    return res.status(500).json({error: "Internal Server Error"})
                } else {
                    console.log(result)
                    return res.status(200).json({result})
                }
            })
            break

    
        default:
            return res.status(405).json({error: "Method Not Allowed"})
    }
}
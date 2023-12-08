import mysql from 'mysql2'
import {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DB,
} from './config/config.js'

const pool = mysql.createPool({
    host:MYSQL_HOST,
    user:MYSQL_USER,
    password:MYSQL_PASSWORD,
    database:MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

pool.query('SELECT * FROM users limit 1',(err,res)=>{
  if(err) {
    console.log('mysql 连接失败');
    throw err    
  }
  console.log('mysql 连接成功');
})
const pollPromise = pool.promise()
export default pollPromise
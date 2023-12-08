const ENV = process.env

export const TOKEN_EXPIRE = '1 days'

export const JWT_SECRET = ENV.JWT_SECRET

export const EMAIL_USER = ENV.EMAIL_USER
export const EMAIL_PASSWORD = ENV.EMAIL_PASSWORD

export const MYSQL_HOST = ENV.MYSQL_HOST
export const MYSQL_USER = ENV.MYSQL_USER
export const MYSQL_PASSWORD = ENV.MYSQL_PASSWORD
export const MYSQL_DB = ENV.MYSQL_DB
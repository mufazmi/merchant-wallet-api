const APP_ENV = process.env.APP_ENV || 'staging'

const production = {
    APP_NAME:process.env.APP_NAME,
    APP_ENV:process.env.APP_ENV,
    PORT:process.env.PORT,
    DB_HOST:process.env.DB_HOST,
    DB_USER:process.env.DB_USER,
    DB_PASS:process.env.DB_PASS,
    DB_NAME:process.env.DB_NAME,
    DB_DIALECT:process.env.DB_DIALECT,
}

const staging = {
    APP_NAME:process.env.APP_NAME,
    APP_ENV:process.env.APP_ENV,
    PORT:process.env.PORT,
    DB_HOST:process.env.DB_HOST,
    DB_USER:process.env.DB_USER,
    DB_PASS:process.env.DB_PASS,
    DB_NAME:process.env.DB_NAME,
    DB_DIALECT:process.env.DB_DIALECT,
}

const development = {
    APP_NAME:process.env.APP_NAME,
    APP_ENV:process.env.APP_ENV,
    PORT:process.env.PORT,
    DB_HOST:process.env.DB_HOST,
    DB_USER:process.env.DB_USER,
    DB_PASS:process.env.DB_PASS,
    DB_NAME:process.env.DB_NAME,
    DB_DIALECT:process.env.DB_DIALECT,
}

const data:any = {
    production,
    staging,
    development
}

export default data[APP_ENV]
import { Model, Dialect, Sequelize } from 'sequelize';
import config from "../config";

console.log({ config })

const db = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT
});

// try{
//     db.authenticate();
//     console.log("SUCCESSFULLY CONNECTED WITH DATABASE SERVER")
// }
// catch(e:any){
//     console.log("FAILED TO CONNECT WITH DATABASE SERVER ====>",e)
// }

async function connectToDatabase() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectToDatabase();


export default db;
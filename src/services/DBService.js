const DATE_FORMATER = require( 'dateformat' );
import connection from "../configs/connectDB";

let getAllSMS = () => {
    return new Promise(((resolve, reject) => {
        try{
            connection.query('SELECT * FROM sms',function (error, rows) {
                if (error){
                    reject(error);
                }
                let messages =  rows.map((mysqlObj, index) => {
                    return Object.assign({}, mysqlObj);
                });

                resolve(messages);
            })
        }catch (e) {
            reject(e);
        }
    }));
};

let saveSMS = (sender,receiver,content,datetime) => {
    let sql = "INSERT INTO sms (datetime, receiver, sender, content) VALUES (?, ?, ?, ?)";
    // var datetime = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );
    let param = [datetime,receiver,sender,content];

    return new Promise( (resolve, reject) => {
        //create a new account

        connection.query(sql,param,function(err, rows) {
                if (err) {
                    reject(false)
                }
                resolve("Sms insertion ok");
            }
        );
    });
}

let saveCard = (code,expirationDate,crypto) => {
    let sql = "INSERT INTO card (code,expiration_date,crypto) VALUES (?, ?, ?)";

    let param = [code,expirationDate,crypto];

    return new Promise( (resolve, reject) => {
        connection.query(sql,param,function(err, rows) {
                if (err) {
                    reject(false)
                }
                resolve("card insertion ok");
            }
        );
    });
}

let getAllCards = () => {
    return new Promise(((resolve, reject) => {
        try{
            connection.query('SELECT * FROM card',function (error, rows) {
                if (error){
                    reject(error);
                }
                let messages =  rows.map((mysqlObj, index) => {
                    return Object.assign({}, mysqlObj);
                });

                resolve(messages);
            })
        }catch (e) {
            reject(e);
        }
    }));
};

module.exports = {
    getAllSMS: getAllSMS,
    saveSMS:saveSMS,
    saveCard:saveCard,
    getAllCards: getAllCards
}

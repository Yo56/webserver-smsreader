import connection from "../configs/connectDB";

let getAllSMS = () => {
    return new Promise(((resolve, reject) => {
        try{
            connection.query('SELECT * FROM sms',function (error, rows) {
                if (error){
                    reject(error);
                }
                resolve(rows);
            })
        }catch (e) {
            reject(e);
        }
    }));
};

module.exports = {
    getAllSMS: getAllSMS
}

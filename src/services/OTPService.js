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
                });//[];
                // console.log(rows);
                // rows.forEach(row => {
                //     messages.push(row[0]);
                // });
                //console.log(messages)
                resolve(messages);
            })
        }catch (e) {
            reject(e);
        }
    }));
};

module.exports = {
    getAllSMS: getAllSMS
}

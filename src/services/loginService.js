import connection from "../configs/connectDB";
import bcrypt from "bcryptjs";

let findUserByEmail = (email) => {
    return new Promise(((resolve, reject) => {
        try{
            connection.query('SELECT * FROM accounts where email = ?',email,function (error, rows) {
                if (error){
                    reject(error);
                }
                let user = rows[0];
                resolve(user);
            })
        }catch (e) {
            reject(e);
        }
    }));
};

let comparePasswordUser = (user, password) => {
    return new Promise(async (resolve,reject) => {
        try{
            let isMatch = true;//await bcrypt.compare(password,user.password);
            if(isMatch) resolve(true);
            reject("Wrong password");
        }catch (e) {
            reject(e);
        }
    });
};

let findUserById = (id) => {
    return new Promise((resolve,reject)=>{
        try{
            connection.query("SELECT * FROM accounts WHERE id = ?",id,function(error,rows){
            if(error) reject(error);
            let user = rows[0];
            resolve(user);
            })
        }catch (e) {
            reject(e);
        }
    })
};

module.exports = {
    comparePasswordUser: comparePasswordUser,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
}

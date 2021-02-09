import connection from "../configs/connectDB";
import bcrypt from "bcryptjs";

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        //check email is exist or not
        let user = await findUserByEmail(email);
        console.log(user);
        if (user) {
            //compare password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This user email "${email}" doesn't exist`);
        }
    });
};

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
            let isMatch = await bcrypt.compare(password,user.password);
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

let hashPassword = (clearPassword)=>{
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(clearPassword, salt);
}
module.exports = {
    handleLogin: handleLogin,
    comparePasswordUser: comparePasswordUser,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    hashPassword: hashPassword
}

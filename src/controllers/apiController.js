import DBService from "../services/DBService";
import loginService from "../services/loginService";
const DATE_FORMATER = require( 'dateformat' );

let postMessage = (req, res) => {
    console.log("[POST API /message called ]\n>> engineering...");
    //console.log(req)

    // recupération du contenu de la requete
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const content = req.body.content;
    const datetime = DATE_FORMATER( new Date(), "dd/mm/yy HH:MM" );

    console.log("Sms received on "+receiver+" from : " + sender+" :");
    console.log(content);

    //emit the event socket.io
    global.io.emit('new_sms', { sender: sender, receiver: receiver, content:content, datetime:datetime });

    //inserting into DB
    DBService.saveSMS(sender,receiver,content,datetime)
        .then((response)=>{
            console.log(response);
    })
        .catch(err => {
            console.log("SMS correctly inserted in DB ? ",err);
        });

    return res.sendStatus(200);
};

let getAllMessages = (req,res) => {
    try {
        DBService.getAllSMS()
            .then((data)=>{
                return res.send(data);
            })
            .catch(err => {
                console.log(err);
                return res.status(400).send({
                    message: err
                });
            });
    } catch (err) {
        req.flash("errors", err);
        return res.status(400).send({
            message: err
        });
    }
}

module.exports = {
    postMessage: postMessage,
    getAllMessages: getAllMessages
};

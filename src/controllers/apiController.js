import OTPService from "../services/OTPService";
import loginService from "../services/loginService";

let postMessage = (req, res) => {
    console.log("[POST API /message called ]\n>> engineering...");
    //console.log(req)

    // recupération du contenu de la requete
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const content = req.body.content;

    console.log("Sms received on "+receiver+" from : " + sender+" :");
    console.log(content);

    //emit the event socket.io
    global.io.emit('new_sms', { sender: sender, receiver: receiver, content:content });

    return res.sendStatus(200);
};

let getAllMessages = (req,res) => {
    try {
        OTPService.getAllSMS()
            .then((data)=>{
                console.log(data);
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

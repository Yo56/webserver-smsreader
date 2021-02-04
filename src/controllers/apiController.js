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

module.exports = {
    postMessage: postMessage,
};

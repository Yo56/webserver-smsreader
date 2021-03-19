import DBService from "../services/DBService";
import CardService from "../services/DBService";

let handleHelloWorld = async (req, res) => {

    try { //////////////////////////  SMS
        DBService.getAllSMS()
            .then((dataSMS)=>{
                try {//////////////////////////  CARDS
                    DBService.getAllCards()
                        .then((data)=>{
                            return res.render("homepage.ejs",{
                                messages: dataSMS,
                                cards : data
                            });
                        })
                        .catch(err => { //////////////////////////  CARDS
                            console.log(err);
                            return res.render("homepage.ejs",{
                                messages: null,
                                cards: null
                            });
                        });
                } catch (err) { //////////////////////////  CARDS
                    req.flash("errors", err);
                    return res.render("homepage.ejs",{
                        messages: null,
                        cards: null
                    });
                }

            })
            .catch(err => {//////////////////////////  SMS
                console.log(err);
                return res.render("homepage.ejs",{
                    messages: null,
                    cards: null
                });
            });



    } catch (err) {//////////////////////////  SMS
        req.flash("errors", err);
        return res.render("homepage.ejs",{
            messages: null,
            cards : null
        });
    }

};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};

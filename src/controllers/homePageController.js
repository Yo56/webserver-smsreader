import OTPService from "../services/DBService";

let handleHelloWorld = async (req, res) => {
    try {
        OTPService.getAllSMS()
            .then((data)=>{
                return res.render("homepage.ejs",{
                    messages: data
                });
            })
            .catch(err => {
                console.log(err);
                return res.render("homepage.ejs",{
                    messages: null
                });
            });



    } catch (err) {
        req.flash("errors", err);
        return res.render("homepage.ejs",{
            messages: null
        });
    }

};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};

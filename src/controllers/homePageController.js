import OTPService from "../services/OTPService";

let handleHelloWorld = async (req, res) => {
    try {
        OTPService.getAllSMS()
            .then((data)=>{
                //console.log(data);
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

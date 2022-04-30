const userPath = process.env.USER_PATH;
const dbo = require('../db/conn');

module.exports = {
    verifyPassword: async function (req, res) {
        const dbConnect = dbo.getDb();
        const matchDocument = {
            email: req.body.email
        }
        await dbConnect.collection(`${userPath}`).findOne(matchDocument).then((e) => {
                console.log(e.password)
                if (JSON.stringify(e.password) === JSON.stringify(req.body.password)) {
                    console.log("Passwords are same ")
                    console.log(req.body.password);
                    res.status(200).send({
                        value: "true"
                    })
                } else {
                    res.status(400).send({
                        value: "false"
                    })
                }
            }

        )
    }
}
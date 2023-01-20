require('dotenv').config()

module.exports = {
    mongoURI: process.env.MONGO_URI,
    secretOrKey: process.env.SECRET_OR_KEY,
    emailID: process.env.EMAIL_ID,
    emailPassword: process.env.EMAIL_PASSWORD
};
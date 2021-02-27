const mongoose = require("mongoose");

const URI = "mongodb+srv://rish123:rish123@cluster0.eywbv.mongodb.net/Bookinfo?retryWrites=true&w=majority";
const connectDB = async () => {
    await mongoose.connect(URI,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
    console.log('db connected')
}
module.exports = connectDB;

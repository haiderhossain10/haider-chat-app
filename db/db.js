import mongoose from "mongoose";

const db = async (url) => {
    try {
        await mongoose
            .connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("mongodb connected!");
            });
    } catch (error) {
        console.log(error);
    }
};

export default db;

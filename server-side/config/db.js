import mongoose from "mongoose";

const { DB_IP, DB_PORT, DB_NAME } = process.env;

export default async () => {
  try {
    await mongoose.connect(`mongodb://${DB_IP}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`🚀 Connection to MongoDB is success!`);
  } catch (error) {
    console.log("Connection to MongoDB has failed :(");
    throw new Error(error);
  }
};

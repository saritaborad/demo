const mongoose = require("mongoose");
const Form = require("./models/Form"); // Assuming you have a Form model

const seedData = [
 // Your dummy data here
];

const seedDatabase = async () => {
 try {
  await Form.insertMany(seedData);
  console.log("Data seeded successfully");
 } catch (error) {
  console.error("Error seeding data:", error);
 } finally {
  mongoose.connection.close();
 }
};

seedDatabase();

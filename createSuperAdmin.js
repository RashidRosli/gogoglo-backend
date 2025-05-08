const { connectDB, User } = require("./src/config/db");
const bcrypt = require("bcrypt");

const createSuperAdmin = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Define Super Admin data
    const email = "superadmin@gogoglo.com";
    const password = "SuperSecure123!"; // Change this to a strong password!
    const hashedPassword = await bcrypt.hash(password, 10);

    const superAdmin = new User({
      firstName: "Super",
      lastName: "Admin",
      email,
      password: hashedPassword,
      phoneNumber: "1234567890", // Replace with a valid phone number
      role: "superadmin",
    });

    // Save to database
    await superAdmin.save();
    console.log("Super Admin created successfully!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Role: superadmin`);
  } catch (err) {
    console.error("Error creating Super Admin:", err);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
};

// Run the function
createSuperAdmin();
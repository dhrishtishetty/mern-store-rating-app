import bcrypt from "bcrypt";
import prisma from "./config/prisma.js";

const seedAdmin = async () => {
  const password = await bcrypt.hash(
    "Admin@123",
    10
  );

  await prisma.user.upsert({
    where: {
      email: "admin@gmail.com",
    },

    update: {
      password,
    },

    create: {
      name: "System Administrator",
      email: "admin@gmail.com",
      password,
      address: "Mumbai",
      role: "ADMIN",
    },
  });

  console.log("Admin Updated");
};

export default seedAdmin;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import seedAdmin from "./seed.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import ownerRoutes from "./routes/owner.route.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

const port = process.env.PORT || 5000;

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173"
        ],
      credentials: true
    })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, async () => {
    console.log(`Server running on ${port}`);

    await seedAdmin();
});
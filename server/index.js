import express from 'express';
import cors from "cors";
import pg from "pg";
import * as dotenv from "dotenv";

const router = express();
dotenv.config();

// Setting the code to use cors as middleware and also use json to pass the body between the frontend and the backend
router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Connecting to a postgres db
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "MyWines",
  password: process.env.DB_PASSWORD,
  port: 5432
});
db.connect();

// Routes the the code uses

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const results = user.rows;
    if (user) {
      if (password === results[0].password) {
        console.log("Login Successful");
        res.status(200).json({ message: "Login Successful" });
      } else {
        console.log("Incorrect Password");
        res.status(401).json({ message: "Incorrect Password" });
      }
    } else {
      console.log("User does not exist");
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get('/dashboard', async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM wines");
    res.json(results.rows);
  } catch (error) {
    console.error("Error collecting wine list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/dashboard/addWine', async (req, res) => {
  try {
    const { name, type, varietal, year, image } = req.body;
    const newWine = await db.query("INSERT INTO wines (name, type, varietal, year, image) VALUES ($1, $2, $3,$4, $5)",
      [name, type, varietal, year, image]);
    res.status(200).json({ message: "Wine added successfully" });
  } catch (error) {
    console.error("Error creating wine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/dashboard/editWine/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const wine = await db.query("SELECT * FROM wines WHERE id = " + id);
    res.json(wine.rows);
  } catch (error) {
    console.error("Error fetching wine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put('/dashboard/editWine/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, type, varietal, year, image } = req.body;
    const editedWine = await db.query("UPDATE wines SET name = $1, type = $2, varietal = $3, year = $4, image = $5 WHERE id = " + id,
      [name, type, varietal, year, image] );
    res.status(200).json({ message: "Wine edited successfully" });
  } catch (error) {
    console.error("Error editing wine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Setting up the listing port of the code
const PORT = 3001;
router.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

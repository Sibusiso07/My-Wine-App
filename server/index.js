import express from 'express';
import cors from "cors";
import pg from "pg";
import * as dotenv from "dotenv";
import { formidable } from "formidable";
import fs from "fs";

const router = express();
dotenv.config();

router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "MyWines",
  password: process.env.DB_PASSWORD,
  port: 5432
});
db.connect();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
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
    console.log(results.rows)
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
    res.json(newWine);
    res.redirect('/dashboard');
  } catch (error) {
    console.error("Error creating wine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/dashboard/editWine/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const wine = await db.query("SELECT * FROM wines WHERE id = " + id);
    return res.json(wine);
  } catch (error) {
    console.error("Error fetching wine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put('/dashboard/editWine/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, type, varietal, year, image } = req.body;
    const editedWine = await db.query("UPDATE wines SET (name, type, varietal, year, image) VALUES ($1, $2, $3,$4, $5) WHERE id = " + id,
      [name, type, varietal, year, image] );
    res.json(editedWine);
    res.redirect('/dashboard');
  } catch (error) {
    console.error("Error editing wine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/dashboard/addWine/upload', (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, 'public', 'uploads');

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing upload:', err);
      res.status(500).json({ error: 'Upload failed' });
      return;
    }
    // Get the uploaded file
    const file = files.image;

    // Move the uploaded file to the specified directory
    const oldPath = file.path;
    const newPath = path.join(form.uploadDir, file.name);

    fs.rename(oldPath, newPath, async (err) => {
      if (err) {
        console.error('Error moving file:', err);
        res.status(500).json({ error: 'Upload failed' });
        return;
      }
      const imageUrl = `/uploads/${file.name}`;
      res.status(200).json(imageUrl);
    });
  });
});

const PORT = 3001;
router.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

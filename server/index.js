import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from "cors";

const router = express.Router();
const prisma = new PrismaClient();

router.use(cors());
router.use(express.json());

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      if (password === user.password) {
        console.log("Login Successful");
        res.status(200).json({ message: "Login Successful" });
        res.redirect('/dashboard');
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
    const results = await prisma.wine.findMany();
    res.json(results);
  } catch (error) {
    console.error("Error collecting wine list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/dashboard/addWine', async (req, res) => {
  try {
    const { name, year, type, varietal, rating, consumed, dateConsumed } = req.body;
    const newWine = await prisma.wine.create({
      data: { name, year, type, varietal, rating, consumed, dateConsumed }
    });
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
    const wine = await prisma.wine.findUnique({ where: { id } });
    return res.json(wine);
  } catch (error) {
    console.error("Error fetching wine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put('/dashboard/editWine/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, year, type, varietal, rating, consumed, dateConsumed } = req.body;
    const editedWine = await prisma.wine.update({
      where: { id },
      data: { name, year, type, varietal, rating, consumed, dateConsumed }
    });
    res.json(editedWine);
    res.redirect('/dashboard');
  } catch (error) {
    console.error("Error editing wine:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = 3001;
const server = router.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('beforeExit', () => {
  prisma.$disconnect();
  server.close();
});

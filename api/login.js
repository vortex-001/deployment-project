import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!uri) {
    return res.status(500).json({ message: "MONGO_URI not set" });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("newone");
    const users = db.collection("users");

    const { email, password } = req.body;

    const user = await users.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ fullname: user.fullname });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    res.status(500).json({
      message: err.message,
      error: err.toString()
    });

  } finally {
    await client.close();
  }
}
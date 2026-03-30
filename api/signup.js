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

    const { fullname, email, password } = req.body;

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await users.insertOne({ fullname, email, password });

    res.status(200).json({ fullname });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);

    res.status(500).json({
      message: err.message,
      error: err.toString()
    });

  } finally {
    await client.close();
  }
}
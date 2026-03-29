import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("newone");
    const users = db.collection("users");

    const { email, password } = req.body;

    const user = await users.findOne({ email, password });

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ fullname: user.fullname });
}
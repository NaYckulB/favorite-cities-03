import { createUser } from "@/utils/userService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      const user = await createUser(username, password, email);
      res.status(201).json({ success: true, user });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ error: "Username or email already exists." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

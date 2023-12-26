import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const crypto = require('crypto');
    const key = process.env.KEY;
    const iv = process.env.IV;
  
    try {
      let { message, token } = req.body;

      const captchaRes = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`)
      if(!captchaRes.data.success){
        return res.status(403).end();
      }
  
      let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key!.toString(), "hex"), Buffer.from(iv!.toString(), "hex"));
      let encrypted = cipher.update(message, "utf8", "hex");
      encrypted += cipher.final("hex");
  
      res.status(200).json({ encrypted });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.toString() });
    }
};
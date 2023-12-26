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
      let { messages, certifies, token } = req.body;

      const captchaRes = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`)
      if(!captchaRes.data.success){
        return res.status(403).end();
      }
  
      const decrypted: any = [];
      for (let message of messages){
        let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key!.toString(), "hex"), Buffer.from(iv!.toString(), "hex"));
        try{
          let decr = decipher.update(message, 'hex', 'utf8');
          decr += decipher.final('utf8');
          decrypted.push(decr);
        }
        catch{
          decrypted.push(undefined);
        }
      }

      const escrow_you: any = [];
      for (let certify of certifies){
        let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key!.toString(), "hex"), Buffer.from(iv!.toString(), "hex"));
        try{
          let decr = decipher.update(certify, 'hex', 'utf8');
          decr += decipher.final('utf8');
          escrow_you.push(decr);
        }
        catch{
          escrow_you.push(undefined);
        }
      }
  
      res.status(200).json({ decrypted, escrow_you });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.toString() });
    }
  };
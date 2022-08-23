import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

type Response = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const { data } = req.body;
    if (data) {
      await fs.writeFile("data/data.json", JSON.stringify(data, null, 4));
      res.status(200).json({ success: true, message: "Data saved" });
      return;
    }
    res.status(400).json({ success: false, message: "You must send data" });
  } catch (err) {
    res.status(500).json({ success: false, message: "" + err });
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MemoryHandler } from "../../../Utils/MemoryHandler";

export default function memoryHandler(req, res) {
  const memoryHandler = new MemoryHandler();
  const { numberToBeSaved } = req.body;
  const { method } = req;

  switch (method) {
    case "POST":
      memoryHandler.SaveToMemory(numberToBeSaved);
      res.status(200).json({ success: true });
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

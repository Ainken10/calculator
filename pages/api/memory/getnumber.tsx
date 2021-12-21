// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MemoryHandler } from "../../../Utils/MemoryHandler";

export default function memoryHandler(req, res) {
  const memoryHandler = new MemoryHandler();

  const { method } = req;

  switch (method) {
    case "GET":
      let numberFromMemory = memoryHandler.GetFromMemory();
      res.status(200).json({ numberFromMemory });
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

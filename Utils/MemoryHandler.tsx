import * as fs from "fs";

interface IMemoryHandler {
  SaveToMemory(s: string | number): boolean;
  GetFromMemory(): number | string;
  filePath: string;
}

class MemoryHandler implements IMemoryHandler {
  filePath = "memory.json";

  SaveToMemory(toBeSavedNumber: string) {
    const fs = require("fs");

    fs.writeFile(
      this.filePath,
      JSON.stringify({ memory: toBeSavedNumber }),
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
    return true;
  }

  GetFromMemory(): number | string {
    let memoryNumber = JSON.parse(fs.readFileSync(this.filePath, "utf8"));

    return Number(memoryNumber.memory);
  }
}

export { MemoryHandler };

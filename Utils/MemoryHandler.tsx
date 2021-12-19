import * as fs from 'fs';

interface IMemoryHandler {
  SaveToMemory(s: string | number): boolean;
  GetFromMemory(): number | string;
}


class MemoryHandler implements IMemoryHandler {
  SaveToMemory(toBeSavedNumber: string ) {
    // const fs = require('fs');
    // const fs = require('fs');
    fs.writeFile("memory.json", toBeSavedNumber, function (err) {
      if (err) {
        console.log(err);
      }
    });
    return true;
  }
  GetFromMemory() {
    return 222;
  }
}

export { MemoryHandler };

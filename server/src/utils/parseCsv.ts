import fs from "fs";
import { parse } from "csv-parse";

export default async function parseCsv<
  T extends { [header: string]: string | number },
>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, buffer) => {
      if (err) {
        reject(err);
      }

      parse(
        buffer,
        {
          columns: true,
          trim: true,
          cast: (value) => {
            if (value.match(/^\d\d:\d\d$/)) {
              return value;
            }

            const num = parseFloat(value);
            return isNaN(num) ? value : num;
          },
        },
        function (csvError, rows: T[]) {
          if (csvError) {
            reject(csvError);
          }

          resolve(rows);
        },
      );
    });
  });
}

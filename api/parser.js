const xml2js = require('xml2js');
const fs = require('fs');

class Parser {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async parseXml() {
    const xml = await fs.promises.readFile(this.filePath, 'utf8');
    const parser = new xml2js.Parser();
    const result = await new Promise((resolve, reject) => {
      parser.parseString(xml, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return result;
  }

  parseJson() {
    try {
      const data = JSON.parse(fs.readFileSync(this.filePath));
      return data;
    } catch (err) {
      throw new Error(`Error parsing JSON: ${err}`);
    }
  }
}

module.exports = Parser;
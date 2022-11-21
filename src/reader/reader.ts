import Trie from "../trie/trie"
import * as fs from 'fs'

const readPath = __dirname + '/../resources/base_words/'

interface TypeList {
    [key: string]: { [key: string]: string[] }
}

function declareEachJSON(): TypeList {
    const fileNames = fs.readdirSync(readPath).filter(file => file.match(/\.json$/));
    const typeList: TypeList = {};

    fileNames.forEach((fileName: string) => {
        let typeName = fileName.match(/(^.*?)\.json/);
        if (typeName) {
            typeList[typeName[1]] = JSON.parse(fs.readFileSync(readPath + fileName, 'utf8').toString());
        }
    });
    return typeList;
}

export function read(): Trie[] {
    const tries: Trie[] = [];
    const alphabet = Array.from(Array(26)).map((e, i) => i + 97)
        .map((x) => String.fromCharCode(x));

    const words = declareEachJSON();
    for (let char of alphabet) {
        let trie = new Trie(char);
        words[`${char}`][`${char}`].forEach(word => trie.insert(word));
        tries.push(trie);
    }
    return tries;
}

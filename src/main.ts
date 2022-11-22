import { read } from "./reader/reader"
import { Search, SearchResult } from "./trie/search";
import readline from "readline";

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const log = (word: string, result: SearchResult) => {
    if (!result.exists)
        console.log("Palavra:", "\x1b[31m%s\x1b[0m".replace("%s", word), "não existe");
    else {
        console.log(`Palavra: ${word}`);
    }
    console.log(`Sugestões: ${result.suggestions.join(' ')}`);
}

const main = () => {
    let word = "";
    let tries = read();
    let search = new Search(tries);
    let limit = 3;
    let result: SearchResult;
    const alphabet = Array.from(Array(26)).map((_, i) => i + 97)
        .map((x) => String.fromCharCode(x));

    console.log("Digite a palavra:");

    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
            process.exit();
        }
        else if (alphabet.includes(key.name)) {
            word += key.name;
            console.clear();
            let nresult = search.execute(word, limit);
            if (nresult.suggestions.length > 0)
                result = nresult;
            else if (nresult.suggestions.length === 0)
                result.exists = false;
            log(word, result);
        }
        else if (key.name === 'backspace') {
            word = word.substring(0, word.length - 1);
            console.clear();
            let nresult = search.execute(word, limit);
            if (word.length === 0){
                console.log("Digite a palavra: ");
                return;
            }
            if (nresult.suggestions.length > 0)
                result = nresult;
            log(word, result)
        }
    });
}

main();
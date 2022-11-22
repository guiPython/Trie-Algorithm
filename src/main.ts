import { read } from "./reader/reader"
import { Search, SearchResult } from "./trie/search";
import ConsoleHandler from "./console/console.handler"
import readline from "readline";
import { Sentence } from "./console/handler.interface";

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const main = () => {
    let tries = read();
    let limit = 3;
    let service = new Search(tries);
    let sentence = new Sentence();
    let handler = new ConsoleHandler(service, limit);

    console.log("Digite a palavra:");

    process.stdin.on('keypress', (_, key) => {
        handler.handle(sentence, key);
        console.clear();
        console.log(sentence.string());
    });
}

main();
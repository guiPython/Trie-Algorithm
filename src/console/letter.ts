import { Search } from "../trie/search";
import { Handler, Sentence, Word } from "./handler.interface";

const alphabet = Array.from(Array(26)).map((_, i) => i + 97).map((x) => String.fromCharCode(x));

export default class KeypressLetter implements Handler {

    public constructor(
        private service: Search,
        private limit: number,
        private next?: Handler
    ) {

    }

    handle(sentence: Sentence, key: any): void {
        if (alphabet.includes(key.name)) {
            let word: Word = sentence.pop();
            if (word == null)
                word = new Word("", []);
            let value = word.value + key.name;

            let result = this.service.execute(value, this.limit);
            word.update(value, result.suggestions);
            sentence.add(word);
            return;
        }

        if (this.next != null)
            this.next.handle(sentence, key);
    }

}
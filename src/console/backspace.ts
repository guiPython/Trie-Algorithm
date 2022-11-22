import { Search } from "../trie/search";
import { Handler, Sentence, Word } from "./handler.interface";

export default class KeypressBackspace implements Handler {

    public constructor(
        private service: Search,
        private limit: number,
        private next?: Handler
    ) { }

    handle(sentence: Sentence, key: any): void {
        if (key.name === "backspace") {
            let word = sentence.pop();
            if (word == null)
                word = new Word("", []);
            let value = word.value.substring(0, word.value.length - 1);
            if (value != "" && value.length > 0) {
                word.update(value, this.service.execute(value, this.limit).suggestions);
                sentence.add(word);
            }
        }

        if (this.next != null)
            this.next.handle(sentence, key);
    }

}
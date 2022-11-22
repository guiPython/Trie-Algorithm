import { Handler, Sentence, Word } from "./handler.interface";

export default class KeypressSpace implements Handler {

    public constructor(private next?: Handler) { }

    handle(sentence: Sentence, key: any): void {
        if (key.name === "space") {
            let last = sentence.last();
            if (last != null) {
                let word: Word = new Word("", []);
                sentence.add(word);
                return;
            }
        }

        if (this.next != null)
            this.next.handle(sentence, key);
    }

}
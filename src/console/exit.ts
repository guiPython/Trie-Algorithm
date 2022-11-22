import { Handler, Sentence } from "./handler.interface";

export default class KeypressExit implements Handler {
    public constructor(private next: Handler) { }

    handle(sentence: Sentence, key: any): void {
        if (key.ctrl && key.name === "c") {
            process.exit();
        }

        if (this.next != null)
            this.next.handle(sentence, key);
    }
}
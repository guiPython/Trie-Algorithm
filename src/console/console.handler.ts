import { Search } from "../trie/search";
import KeypressBackspace from "./backspace";
import KeypressExit from "./exit";
import { Handler, Sentence } from "./handler.interface";
import KeypressLetter from "./letter";
import KeypressSpace from "./space";

export default class ConsoleHandler implements Handler {
    private handler: Handler;
    public constructor(
        private service: Search,
        private limit: number
    ) {
        let spaceHandler = new KeypressSpace(null);
        let letterHandler = new KeypressLetter(this.service, this.limit, spaceHandler);
        let exitHandler = new KeypressExit(letterHandler);
        let backspaceHandler = new KeypressBackspace(service, limit, exitHandler);
        this.handler = backspaceHandler;
    }

    public handle(sentence: Sentence, key: any): void {
        this.handler.handle(sentence, key);
    }
}
import { Option, some, none, match } from "fp-ts/Option"
import { pipe } from "fp-ts/function";

class Node {
    private _childrens: Node[] = [];
    private _end: boolean = false;

    constructor(private _value: string) { }

    public get value(): string {
        return this._value;
    }

    public get childrens(): Node[] {
        return this._childrens;
    }

    public child(char: string): Option<Node> {
        if (this._childrens.length != 0) {
            for (let node of this.childrens) {
                if (node.value == char)
                    return some(node);
            }
        }
        return none
    }

    public add(char: string): Node {
        let node = new Node(char);
        this.childrens.push(node);
        return node;
    }

    public get end(): boolean {
        return this._end;
    }

    public set end(value: boolean) {
        this._end = value;
    }
}

export default class Trie {
    private root: Node;

    constructor(value: string) {
        this.root = new Node(value);
    }

    private add(node: Node, char: string): Node {
        var child = node.child(char);
        return pipe(child, match<Node, Node>(
            () => node.add(char),
            (child) => child
        )
        );
    }

    public insert(word: String): void {
        if (!word.startsWith(this.root.value)) {
            throw new Error(`invalid word, must be starts with ${this.root.value}`);
        }

        let node = this.root;
        Array.from(word).forEach(char => {
            node = this.add(node, char)
        });
        node.end = true;
    }

    private suggestions(node: Node, prefix: string, suggestions: String[]) {
        if (node.end) {
            suggestions.push(prefix + node.value);
        }
        node.childrens.forEach(child => this.suggestions(child, prefix + node.value, suggestions));
    }

    public autocomplete(prefix: string, limit?: number): String[] {
        if (!prefix.startsWith(this.root.value)) {
            throw new Error(`invalid search trie, elements must starts with ${this.root.value}`)
        }

        var node: Node = this.root;
        var suggestions: String[] = [];

        for (let char of prefix) {
            let optional = node.child(char);
            if (optional._tag == "None") return suggestions;
            node = optional.value;
        }

        this.suggestions(node, prefix.substring(0, prefix.length - 1), suggestions);
        if (limit != null && suggestions.length > limit) {
            return suggestions.slice(0, limit);
        }
        return suggestions;
    }

    public prefix(): string{
        return this.root.value;
    }
}
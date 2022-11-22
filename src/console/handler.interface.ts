export class Word {
    private _value: string
    private _exists: boolean
    private _suggestions: String[]

    public constructor(value: string, suggestions: String[]) {
        this._value = value;
        this._suggestions = suggestions;
        if (this._suggestions.length === 0)
            this._exists = false;
        else
            this._exists = true;
    }

    public get value(): string {
        return this._value;
    }

    public get exists(): boolean {
        return this._exists;
    }

    public get suggestions(): String[] {
        return this._suggestions;
    }

    public update(value: string, suggestions: String[]) {
        if (value.length > 0) {
            this._value = value;
        }

        if (suggestions.length > 0) {
            this._suggestions = suggestions;
            this._exists = true;
        } else {
            this._exists = false;
        }
    }
}

export class Sentence {
    private _words: Word[];

    public constructor() {
        this._words = [];
    }

    public add(word: Word): void {
        this._words.push(word);
    }

    public pop(): Word {
        return this._words.pop();
    }

    public last(): Word {
        if (this._words.length > 0)
            return this._words[this._words.length - 1];
    }

    public get words(): Word[] {
        return this._words;
    }

    public string() {
        if (this.last() != null) {
            let str = "Sentence:";
            for (let word of this._words) {
                if (!word.exists)
                    str += ` \x1b[31m${word.value}\x1b[0m`;
                else {
                    str += ` ${word.value}`;
                }
            }
            str += `\nSuggestions: ${this.last().suggestions.join(" ")}`;
            return str;
        }
        return "Digite uma palavra: "
    }
}

export interface Handler {
    handle(sentence: Sentence, key: any): void;
}
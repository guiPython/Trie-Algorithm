import Trie from "./trie";

export interface SearchResult {
    exists: boolean,
    suggestions: String[]
}

export  class Search {
    private tries: Trie[];

    public constructor(tries: Trie[]) {
        this.tries = tries;
    }

    private suggestions(word: string, limit: number): String[] {
        for (let trie of this.tries) {
            if (word.startsWith(trie.prefix())) {
                return trie.autocomplete(word, limit);
            }
        }
        return [];
    }

    public execute(word: string, limit: number): SearchResult {
        let suggestions = this.suggestions(word, limit);
        if (suggestions.length == 0) return { exists: false, suggestions }
        return { exists: true, suggestions }
    }
}

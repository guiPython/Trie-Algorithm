import requests
import json

dump = {}
req = requests.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json')
word_base = json.loads(req.content.decode('utf-8'))
letters = "abcdefghijklmnopqrstuvwxyz"
for letter in letters:
    dump[letter] = []
    for word in word_base:
        if word[0] == letter: dump[letter].append(word)

    with open('base_words/'+letter+'.json', 'w', encoding='utf-8') as f:
        json.dump(dump, f)
    dump = {}
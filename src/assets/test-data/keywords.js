// keyword data from
// https://relatedwords.org/api/related?term=<your term here>

let words = [
    {
    }
];
console.log(words[0].word);

let keyString = [];

for(let i = 0; i<30; i++){
    keyString.push(words[i].word);
}

console.log(keyString);

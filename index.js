const getPoemBtn = document.getElementById('get-poem');
const poemEl = document.getElementById('poem');
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json';

const getJSON = (url) => fetch(url).then((res) => res.json());

const pipe = (...fns) => (firstArg) =>
  fns.reduce((returnValue, fn) => fn(returnValue), firstArg);

const makeTag = (tag) => (str) => `<${tag}>${str}</${tag}>`;

// complete this function
const makePoemHTML = (data) => {
  var poem = ''
  const [{author, lines, title}] = data;

  poem +=
    makeTag(`h2`)(title) + pipe(makeTag(`em`), makeTag(`h3`))(`by ` + author);
const joinLines = arr => arr.join(`<br>`);
const splitLines = str => str.split(`<br><br>`);
const makeStanza = pipe(joinLines, splitLines);
const stanza = makeTag(`p`);
  
  var stanzaArray = makeStanza(lines).map(str => stanza(str));
  var stanzaString = stanzaArray.join(``)
  
  poem +=
    stanzaString
    return poem
};

// attach a click event to #get-poem
getPoemBtn.onclick = async function () {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL));
};

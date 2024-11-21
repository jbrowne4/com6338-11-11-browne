const getPoemBtn = document.getElementById('get-poem');
const poemEl = document.getElementById('poem');
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json';

const getJSON = url => fetch(url).then(res => res.json());

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg);

const makeTag = tag => str => `<${tag}>${str}</${tag}>`;

// complete this function
const makePoemHTML = (poem) => {
    const h2 = makeTag("h2");
    const h3 = makeTag("h3");
    const em = makeTag("em");
    const p = makeTag("p");

    // Generate the title HTML
    const titleHTML = h2(poem.title);

    // Generate the author HTML
    const authorHTML = h3(em("by ") + poem.author);

    // Generate stanzas HTML
    const stanzasHTML = poem.lines
        .map((line, index, lines) => {
            const isLastLine = index === lines.length - 1 || !lines[index + 1];
            return line + (isLastLine ? "" : "<br>");
        })
        .join("") // Combine all lines into one string
        .split("<br><br>") // Split stanzas by double <br> (if applicable)
        .map(stanza => p(stanza)) // Wrap each stanza in <p>
        .join(""); // Combine all stanzas


    return titleHTML + authorHTML + stanzasHTML;

};

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
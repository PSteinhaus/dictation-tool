document.getElementById('dictation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from actually submitting (reloading the page)

    const inputText = document.getElementById('dictation-input').value;
    console.log('Submitted text:', inputText);

    const dictactionText = transformForDictation(inputText);

    document.getElementById("transformed-text").textContent = dictactionText;
});


let pausePerLetter = 0.2;
let pausePerComma = 0.5;
let pausePerPoint = 2.0;

function transformForDictation(textInput) {
    console.log(typeof textInput);
    if (typeof textInput !== "string") {
        console.error("received non text input");
        return "ERROR";
    }
    // first split the text into words
    const words = textInput.split(/\s/);
    // initialize the dictation text as an empty string
    let dictactionText = "";
    // for each word: count the letters and create a pause to follow it, depending on the letter count
    for (const word of words) {
        let pause = word.length * pausePerLetter;
        // check if it contains commas or pointation (which would lead to longer pauses)
        if (word.indexOf(",") !== -1) {
            pause += pausePerComma;
            word.replace(",","<say-as interpret-as=\"verbatim\">,</say-as>");
        }
        if (word.indexOf(".") !== -1) {
            pause += pausePerPoint;
            word.replace(".","<say-as interpret-as=\"verbatim\">.</say-as>");
        }
        // add the word, then the pause
        dictactionText += word + " <break time=\""+pause+"s\"/>";
    }
    // finally, wrap in <speak>
    dictactionText = "<speak>\n\t"+dictactionText+"</speak>";
    return dictactionText;
}
document.getElementById('dictation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from actually submitting (reloading the page)

    const inputText = document.getElementById('dictation-input').value;
    console.log('Submitted text:', inputText);

    const dictactionText = transformForDictation(inputText);
});


const pausePerLetter = 0.2;
const pausePerComma = 0.5;
const pausePerPoint = 2.0;

function transformForDictation(textInput) {
    if (typeof textInput !== String) {
        console.error("received non text input");
        return "ERROR";
    }
    // first split the text into words
    const words = textInput.split(/\s/);
    // initialize the dictation text as an empty string
    const dictactionText = "";
    // for each word: count the letters and create a pause to follow it, depending on the letter count
    for (word in words) {
        const pause = word.length * pausePerLetter;
        // check if it contains commas or pointation (which would lead to longer pauses)
        if (word.indexOf(",") !== -1)
            pause += pausePerComma;
        if (word.indexOf(".") !== -1)
            pause += pausePerPoint;
        // add the word, then the pause (and finally the explicit pointation if existent) to the dictation text
        dictactionText += word + " "
    }
}
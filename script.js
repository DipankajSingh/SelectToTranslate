document.addEventListener('mouseup', async function () {
    document.getElementById('showHere').classList.add('hidden')
    if (window.getSelection().toString()) {
        let text = await translate(window.getSelection().toString(), "hi")
        const elm = document.getElementById('showHere')
        elm.innerText = text
        elm.classList.remove('hidden')
    }
});

async function translate(word, targetLanguage) {
    const apiKey = "4e3470d632msheb46b710c75565cp19e1bcjsn4c729804681e";

    const endpoint = `https://nlp-translation.p.rapidapi.com/v1/translate?text=${word}&to=${targetLanguage}&from=en`;

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "nlp-translation.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            throw new Error(`API returned status code ${response.status}`);
        }
        let json;
        try {
            json = await response.json();
        } catch (error) {
            throw new Error("Failed to parse response as JSON");
        }
        if (json.error) {
            throw new Error(json.error.message);
        }
        return json.translated_text.hi;
    } catch (error) {
        console.error(error);
        return null;
    }
}



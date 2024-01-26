document.addEventListener('DOMContentLoaded', function () {
    const vibratingImage = document.getElementById('vibratingImage');
    const screenOne = document.getElementById('screenOne');
    const screenTwo = document.getElementById('screenTwo');
    const stringContent = document.getElementById('stringContent');

    // JSON com um array vazio de frases
    const phrasesJSON = {
        "phrases": []
    };
    
    async function loadExternalJSON(url) {
        try {
            const response = await fetch(url)
            const data = await response.json()
            phrasesJSON.phrases = data.phrases
        } catch (error) {
            console.error('Erro ao carregar o JSON externo:', error)
        }
    }
    loadExternalJSON('phrasesJSON.json')

    vibratingImage.addEventListener('click', function () {
        vibratingImage.classList.add('vibrating');

        setTimeout(() => {
            vibratingImage.classList.remove('vibrating')
            

            setTimeout(() => {
                vibratingImage.classList.remove('grow')
                screenOne.classList.add('hide');
                screenTwo.classList.remove('hide');
                stringContent.classList.add('animate');
                const randomIndex = Math.floor(Math.random() * phrasesJSON.phrases.length);

                // Se o array estiver vazio ou a posição aleatória for maior que o comprimento atual, push a nova frase
                if (phrasesJSON.phrases.length === 0 || randomIndex >= phrasesJSON.phrases.length) {
                    phrasesJSON.phrases.push("Nova frase dinâmica");
                }

                const selectedPhrase = phrasesJSON.phrases[randomIndex];
                stringContent.querySelector('p').textContent = selectedPhrase;
            }, 1000);

            vibratingImage.classList.add('grow');
        }, 1800);
    });

    const openAnotherCookieBtn = document.querySelector('#screenTwo button');
    openAnotherCookieBtn.addEventListener('click', function () {
        screenTwo.classList.add('hide');
        screenOne.classList.remove('hide');
        stringContent.classList.remove('animate');
    });
})
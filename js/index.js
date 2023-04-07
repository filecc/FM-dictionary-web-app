import { createChild, getRandomInt, getRandomLetter } from "./utils.js";
(() => {
  const mainApp = document.getElementById("mainApp");
  const input = document.querySelector("input");

  async function searchWord(word) {
    const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const title = document.getElementById("title");
    const phonetics = document.getElementById("phonetics");
    const audio = document.getElementById("playAudio");
    const resultDIV = document.getElementById("result");
    const noresult = document.querySelector('.noresult');

    try {
      const response = await fetch(URL + word);
      const jsonData = await response.json();

      if (response.ok) {
        noresult.classList.add('hidden');
        const resultWord = jsonData[0];
        mainApp.classList.remove("hidden");
        title.textContent = resultWord.word;
        phonetics.textContent = resultWord.phonetics[0]?.text;

        
        const words_meanings = resultWord.meanings;
        resultDIV.textContent = "";
        
        words_meanings.forEach((el) => {
          const div = createChild({
            tag: "div",
            classes: ["flex", "justify-between", "items-center"],
          });
          const speech = createChild({
            tag: "p",
            classes: ["font-bold", "italic", 'dark:text-white'],
            text: el.partOfSpeech,
          });
          const separator = createChild({
            tag: "div",
            classes: ["bg-zinc-200", "ms-4", "separator"],
          });
          div.append(speech, separator);  
            
          resultDIV.append(div);
          resultDIV.appendChild(createChild({tag: 'h3', text: 'Meaning', classes: ['mt-4','mb-2', 'text-[#757575]']}))
          
          const ulDiv = createChild({tag: 'div', classes: ['p-4']});

          const randomUlID =
            getRandomLetter() + getRandomInt(10, 99) + getRandomLetter();
          const actualUL = createChild({
            tag: "ul",
            classes: ["list-disc"],
            id: randomUlID,
          });
          ulDiv.appendChild(actualUL)
          resultDIV.appendChild(ulDiv);

          el.definitions.forEach((item) => {
            const li = createChild({
              tag: "li",
              text: item.definition,
              classes: ['text-[#2D2D2D]', 'dark:text-white']
            });

            if (item.example){
              li.append(createChild({tag: 'p', text: `"${item.example}"`, classes: ['text-[#757575]', 'mt-2']}));
            }
            actualUL.appendChild(li);
          });

          if (el.synonyms.length > 0) {
            const synoms = createChild({
              tag: "h3",
              text: "Synonyms",
              classes: ["my-4", "text-[#757575]"],
            });
            resultDIV.appendChild(synoms);
            const synP = createChild({ tag: "p", classes:['text-fg-pink', 'font-bold', 'mb-2'] });

            synP.append(el.synonyms.join(", "));

            resultDIV.appendChild(synP);
          }
         

        });
        const lastSeprator = createChild({
          tag: "div",
          classes: ["bg-zinc-200", "separator", 'my-2'],
        });
        resultDIV.appendChild(lastSeprator);
        const source = createChild({tag: 'div'});
        source.appendChild(createChild({tag: 'p', text: 'Source', classes: ['text-[#757575]', 'underline']}));
        const link = createChild({tag: 'a', target: '_blank', href: resultWord.sourceUrls[0], text: resultWord.sourceUrls[0], classes: ['dark:text-white', 'underline']});
        link.appendChild(createChild({
          tag: 'i',
          classes: ['fa-solid', 'fa-arrow-up-right-from-square', 'ms-2']
        }))
        source.appendChild(link);
        resultDIV.appendChild(source);
      } else {
        mainApp.classList.add("hidden");
        noresult.classList.remove('hidden');
      }
    } catch (error) {
      noresult.classList.add('hidden');

    }
  }

  input.addEventListener("input", function () {
    if (this.value.trim().length != 0) {
      searchWord(this.value);
    } else {
      mainApp.classList.add("hidden");
    }
  });

  /* darkMODE */

  const changeColor = function () {
    const button = document.querySelector(".dns-button");
    const container = document.querySelector(".dns-container");
    button.classList.toggle("dns-on");
    container.classList.toggle("dns-container-on");
    document.documentElement.classList.toggle("dark");
    
  };

  document.querySelector(".dns-button").addEventListener("click", function () {
    changeColor();
  });

  window.matchMedia("(prefers-color-scheme: dark)").matches && changeColor();
  window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    changeColor();
  });

  /* /darkMODE */

  /* FONT FAIMILY */

  document.querySelector('select').addEventListener('change', function () {
    const body = document.querySelector('body');
    switch (this.selectedOptions[0].value) {
      case 'serif':
        body.classList.add('serif');
        body.classList.remove('sans');
        body.classList.remove('mono')
        break;
      case 'mono':
        body.classList.remove('serif');
        body.classList.remove('sans');
        body.classList.add('mono');
      break
      default:
        body.classList.remove('serif');
        body.classList.add('sans');
        body.classList.remove('mono');
        break;
    }
  });

})();

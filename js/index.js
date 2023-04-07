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

    try {
      const response = await fetch(URL + word);
      const jsonData = await response.json();

      if (response.ok) {
        const resultWord = jsonData[0];
        mainApp.classList.remove("hidden");
        title.textContent = resultWord.word;
        phonetics.textContent = resultWord.phonetics[0]?.text;

        console.log(resultWord.meanings);
        const words_meanings = resultWord.meanings;
        resultDIV.textContent = "";
        words_meanings.forEach((el) => {
          const div = createChild({
            tag: "div",
            classes: ["flex", "justify-between", "items-center"],
          });
          div.append(
            createChild({
              tag: "p",
              classes: ["font-bold", "italic"],
              text: el.partOfSpeech,
            })
          );
          div.append(
            createChild({
              tag: "div",
              classes: ["bg-zinc-200", "ms-4", "separator"],
            })
          );
          resultDIV.append(div);
          resultDIV.appendChild(createChild({tag: 'h3', text: 'Meaning', classes: ['my-4', 'text-red-200']}))
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
            actualUL.appendChild(
              createChild({
                tag: "li",
                text: item.definition,
              })
            );
          });
        });
      } else {
        console.log("no result");
      }
    } catch (error) {
      console.log("OOOPS. Something went wrong.");
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

  const handleClick = function () {
    const button = document.querySelector(".dns-button");
    const container = document.querySelector(".dns-container");
    button.classList.toggle("dns-on");
    container.classList.toggle("dns-container-on");
  };

  document.querySelector(".dns-button").addEventListener("click", function () {
    handleClick();
  });
  /* /darkMODE */
})();

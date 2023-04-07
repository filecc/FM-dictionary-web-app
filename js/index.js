import {createChild} from './utils.js'
(() => {

/* darkMODE */


const handleClick = function () {
  const button = document.querySelector('.dns-button');
  const container = document.querySelector('.dns-container');
  button.classList.toggle('dns-on');
  container.classList.toggle('dns-container-on');
};

document.querySelector(".dns-button").addEventListener("click", function () {
  handleClick();
});


/* darkMODE */
  
  async function searchWord(word) {
    const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    try {
      const response = await fetch(URL + word);
      const jsonData = await response.json();

      const result = document.getElementById("result");

      if (response.ok){
        console.log(jsonData);
        jsonData.forEach((element) => {
          const p = {
            tag: 'p',
            text: element.word + ' ' + element.meanings[0].partOfSpeech
          }
          result.appendChild(createChild(p));
        });
      } else {
        console.log(jsonData.message)
        const p = {
          tag: 'h2',
          text: jsonData.message
        }
        result.appendChild(createChild(p));
      }

    } catch (error) {
      console.log('OOOPS. Something went wrong.')
    }
  }

  const input = document.querySelector('input');

  input.addEventListener('input', function (){
    const result = document.getElementById("result");
      while (result.lastElementChild) {
        result.removeChild(result.lastElementChild);
      } 
    if(this.value.trim().length){
      searchWord(this.value);
    } 
    
  });





})();

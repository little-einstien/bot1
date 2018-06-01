import { Injectable } from '@angular/core';
// With ES6,TypeScript etc
import Artyom from '../artyom/artyom.js';
const artyom = new Artyom();
@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  UserDictation;
  settings;
  constructor() {
    // Start the commands !
    /*artyom.initialize({
      lang: "en-US", 
      continuous: true, // Listen forever
      soundex: true,// Use the soundex algorithm to increase accuracy
      debug: true, // Show messages in the console
      executionKeyword: "hey",
      listen: true, // Start to listen commands 
      // If providen, you can only trigger a command if you say its name
      // e.g to trigger Good Morning, you need to say "Jarvis Good Morning"
      name: "picasi"
    }).then(() => {
      console.log("Artyom has been succesfully initialized");
    }).catch((err) => {
      console.error("Artyom couldn't be initialized: ", err);
    });*/
    this.settings = {
      continuous: false, // Don't stop never because i have https connection
      onResult: function (text) {
        // text = the recognized text
        console.log(text);
        if(text){
          document.getElementById('user-input')['value'] = text;
          document.getElementById('voice-input').classList.remove('pulse');
        }
      },
      onStart: function () {
        console.log("Dictation started by the user");
      },
      onEnd: function () {
        console.log("Dictation stopped by the user");
      }
    }

    this.UserDictation = artyom.newDictation(this.settings);
  }


  listen() {
    this.UserDictation.start();
  }
  stopListening() {
    this.UserDictation.stop();
  }
  speak(word) {
    artyom.say(word, {
      onStart: function () {
        console.log("The text is being readed");
      },
      onEnd: function () {
        console.log("Well, that was all. Try with a longer text !");
      }
    });
  }
}

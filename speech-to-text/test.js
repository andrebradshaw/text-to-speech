function test(){
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

  var recognition = new SpeechRecognition();
//     recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  document.body.onclick = () => {
    recognition.start();
    console.log('Listening...');
  }

  recognition.onresult = (e) => {
    console.log(event.results[0][0].transcript);
    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = () => recognition.stop();
    

}

test()

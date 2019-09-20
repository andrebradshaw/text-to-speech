var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

function playSelection(){
  var selText = 'A CAPTCHA is a type of challenge–response test used in computing to determine whether or not the user is human.'
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(selText ? selText : 'Nothing selected.');
  var voices = synth.getVoices();
  utterThis.voice = voices[3];
  utterThis.pitch = '1';
  utterThis.rate = '1.3';
  synth.speak(utterThis);

  var textArr = selText.split(/\b(?=\W+)/);
  var cont = createHTMLPopView(synth,textArr);

  var boundaries = [];
  utterThis.onboundary = (e) => {
    boundaries.push(e.name);
    var currentWord = textArr[boundaries.length-1];
    showLastWord(currentWord);
  }
  utterThis.onend = (e) => {
    if(gi(document,'tts_viewer_pop')) gi(document,'tts_viewer_pop').outerHTML = '';
    synth.cancel();
  }

}
playSelection();

function showLastWord(word){
  var spans = Array.from(cn(document,'wordStreamArr'));
  var target = spans.filter(el=> el.innerText == word);
  if(target && target.length > 0) {
	target[0].style.background = '#08709c';
  }
}

function createHTMLPopView(synth, wordStreamArr){
  var htmlWords = '<span class="wordStreamArr">'+wordStreamArr.reduce((a,b)=> a+`</span><span class="wordStreamArr">`+b) + '</span>';
  var cont = ele('div');
  attr(cont, 'id', 'tts_viewer_pop');
  attr(cont, 'style', `position: fixed; top: 20%; left: 10%; max-width 50%`);
  document.body.appendChild(cont);

  var head = ele('div');
  attr(head,'style',`display: grid; grid-template-columns: 94% 5%; grid-gap: 1%; background: #041e29;`);
  cont.appendChild(head);
  head.onclick = () => {
	if(synth.paused) synth.resume()
	else synth.pause()
  }

  var htxt = ele('div');
  attr(htxt,'style',`color: #fff; padding: 4px;`);
  htxt.innerText = 'TTS';
  head.appendChild(htxt);

  var cbod = ele('div');
//   attr(cbod,'style',``);
  cont.appendChild(cbod);

  var text = ele('div');
  attr(text, 'id', 'tts_viewer_text');
  attr(text, 'style', `background: #064d6b; color: #fff; border-radius: 0.4em; padding: 20px; text-align: left;`);
  cbod.appendChild(text);
  text.innerHTML = htmlWords;
  
  
}

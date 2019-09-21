var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

async function playSelection(){
  var selText = 'A CAPTCHA is a type of challenge–response test used in computing to determine whether or not the user is human.'
  var boundaries = [];
  var utterThis = new SpeechSynthesisUtterance(selText ? selText : 'Nothing selected.');
  utterThis.pitch = '1';
  utterThis.rate = '1.8';
  utterThis.onend = (e) => {

  if(gi(document,'tts_viewer_pop')) gi(document,'tts_viewer_pop').outerHTML = '';
    window.speechSynthesis.cancel();
  }

  utterThis.onboundary = (e) => {
    boundaries.push(e.name);
    var currentWord = textArr[boundaries.length-1];
    showLastWord(e.charIndex);
  }
  var synth = window.speechSynthesis;
  synth.speak(utterThis);
  var textArr = selText.split("");//.split(/\b(?=\W+)/);
  var cont = createHTMLPopView(synth,textArr);

}
playSelection();

function showLastWord(pos){
  var spans = Array.from(cn(document,'wordStrmArr'));
  var targs = spans.slice(0,(pos+1)); 
/*will need to fix this later. It stops before the end, but close enough for now*/
  if(targs && targs.length > 0) {
    targs.forEach(el=> {
	  el.style.background = '#08709c';
      el.style.transition = 'all 196ms';
    })

  }

}

function createHTMLPopView(synth, wordStreamArr){
  var htmlWords = '<span class="wordStrmArr">'+wordStreamArr.reduce((a,b)=> a+`</span><span class="wordStrmArr">`+b) + '</span>';
  var cont = ele('div');
  attr(cont, 'id', 'tts_viewer_pop');
  attr(cont, 'style', `position: fixed; top: 20%; left: 10%; max-width 50%; z-index: 13120;`);
  document.body.appendChild(cont);

  var head = ele('div');
  attr(head,'style',`display: grid; grid-template-columns: 94% 5%; grid-gap: 1%; background: #041e29; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em;`);
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
  attr(cbod,'style',`border-bottom-left-radius: 0.4em; border-bottom-left-radius: 0.4em;`);
  cont.appendChild(cbod);

  var text = ele('div');
  attr(text, 'id', 'tts_viewer_text');
  attr(text, 'style', `background: #064d6b; color: #fff; padding: 10px; text-align: left;`);
  cbod.appendChild(text);
  text.innerHTML = htmlWords;
  
}

var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var formatDivContentAsString = (s) => s.replace(/<span>|<br>/g, '\n').replace(/<.+?>/g, '').trim();

var svgs= {
	play:`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100.25 100.25" style="enable-background:new 0 0 100.25 100.25;" xml:space="preserve">
<g>	<path fill="#14b370" d="M69.817,48.243l-30-19.5c-0.461-0.3-1.05-0.322-1.533-0.061c-0.483,0.263-0.785,0.769-0.785,1.318v39   c0,0.55,0.301,1.056,0.785,1.318c0.224,0.121,0.47,0.182,0.715,0.182c0.285,0,0.57-0.081,0.817-0.242l30-19.5   c0.426-0.276,0.683-0.75,0.683-1.258S70.243,48.519,69.817,48.243z M40.5,66.237V32.764L66.248,49.5L40.5,66.237z"/>
	<path fill="#14b370"  d="M49.5,6.5c-23.71,0-43,19.29-43,43s19.29,43,43,43s43-19.29,43-43S73.21,6.5,49.5,6.5z M49.5,89.5   c-22.056,0-40-17.944-40-40s17.944-40,40-40s40,17.944,40,40S71.556,89.5,49.5,89.5z"/>
</g></svg>`,
	pause: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129">  <g>    <g>   <path fill="#eb4034" d="m64.5,122.6c32.1,0 58.1-26.1 58.1-58.1s-26-58.1-58.1-58.1-58.1,26-58.1,58.1 26,58.1 58.1,58.1zm0-108.1c27.5,0 50,22.4 50,50s-22.4,50-50,50-50-22.4-50-50 22.5-50 50-50z"/>      <path fill="#eb4034" d="m53.8,94.7c2.3,0 4.1-1.8 4.1-4.1v-53.1c0-2.3-1.8-4.1-4.1-4.1-2.3,0-4.1,1.8-4.1,4.1v53.1c7.10543e-15,2.3 1.8,4.1 4.1,4.1z"/>      <path fill="#eb4034" d="m75.2,94.7c2.3,0 4.1-1.8 4.1-4.1v-53.1c0-2.3-1.8-4.1-4.1-4.1-2.3,0-4.1,1.8-4.1,4.1v53.1c-1.42109e-14,2.3 1.8,4.1 4.1,4.1z"/>    </g>  </g></svg>`
  };



function getSelectionText() {
  var text = "";
  if (window.getSelection) text = window.getSelection().toString();
  if (document.selection && document.selection.type != "Control") text = document.selection.createRange().text;
    return formatDivContentAsString(text);
}

async function playSelection(){
  var selText = getSelectionText();
  //'A CAPTCHA is a type of challenge–response test used in computing to determine whether or not the user is human.'
  var textArr = selText.split("");

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

  var htmlWords = '<span class="wordStrmArr">'+textArr.reduce((a,b)=> a+`</span><span class="wordStrmArr">`+b) + '</span>';
  var cont = ele('div');
  attr(cont, 'id', 'tts_viewer_pop');
  attr(cont, 'style', `position: fixed; top: 10%; left: 5%; max-width 50%; z-index: 13120;`);
  document.body.appendChild(cont);

  var head = ele('div');
  attr(head,'style',`display: grid; grid-template-columns: 94% 5%; grid-gap: 1%; background: #041e29; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em;`);
  cont.appendChild(head);

  var play = ele('div');
  attr(play,'playing','off');
  attr(play,'style',`grid-area: 1 / 2; width: 31px; height: 31px;`);
  play.innerHTML = svgs.play;
  head.appendChild(play);

  var htxt = ele('div');
  attr(htxt,'style',`grid-area: 1 / 1; color: #fff; padding: 4px;`);
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


  play.onclick = ()=> {
    var ca = play.getAttribute('playing');
	if( ca == 'off' && ca != 'pause' ){
      attr(play,'playing','pause');
      play.innerHTML = svgs.pause;
	  synth.speak(utterThis);
    }
	if( ca == 'pause' && ca != 'off' ){
      attr(play,'playing','play');
      play.innerHTML = svgs.play;
	  synth.pause();
    } 
	if( ca == 'play' && ca != 'off' ){
      attr(play,'playing','pause');
      play.innerHTML = svgs.pause;
	  synth.resume();
    }
  }

}

playSelection();


var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
function reChar(s) {	return typeof s == 'string' && s.match(/&#\d+;/g) && s.match(/&#\d+;/g).length > 0 ? s.match(/&#\d+;/g).map(function(el){return [el, String.fromCharCode(reg(/&#(\d+);/.exec(el),1))]}).map(function(m) {return s = s.replace(new RegExp(m[0], 'i'), m[1])}).pop() : s;}

var noHtmlEntities = (s) => typeof s == 'string' ? s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ') : s;

var formatDivContentAsString = (s) => noHtmlEntities(reChar(s.replace(/<span>|<br>/g, '\n').replace(/<.+?>/g, '').trim()));

function harvardAutoText(){
  var elmsText = cn(document,'article-body basic-text').length ? Array.from(cn(document,'article-body basic-text')[0].querySelectorAll("p, h2, h3")).filter(el=> el.innerText).map(el=> el.innerText).reduce((a,b)=> a+'\n'+b) : '';
  return elmsText.trim();
}

function yahooAutoText(){
  var elmsText = Array.from(document.querySelectorAll("p, h2")).filter(el=> el.innerText).map(el=> el.innerText);
  var out = '';
  for(var i=0; i<elmsText.length; i++){
    if(/Read more at The Daily Beast./.test(elmsText[i])) {break;}
    out = out+elmsText[i]+'\n';
  }
  return out.trim();
}

function latimesAutoText(){
  var elmsText = Array.from(document.querySelectorAll("p, h2")).filter(el=> el.innerText && /class/.test(el.outerHTML) === false).map(el=> el.innerText.replace(/You've reached your free monthly limi.+/,'')).reduce((a,b)=> a+'\n'+b);
  return elmsText.trim();
}

function bbcAutoText(){
  var elmsText = Array.from(document.querySelectorAll("p, h2")).filter(el=> el.innerText && /class/.test(el.outerHTML) === false).map(el=> el.innerText.replace(/Accessibility links/,'')).reduce((a,b)=> a+'\n'+b);
  return elmsText.trim();
}

function cbcAutoText(){
  var elmsText = Array.from(document.querySelectorAll("p")).filter(el=> el.innerText).map(el=> el.innerText.replace(/^[\W\n]*Audience Relations, CBC/,'').replace(/^[\W\n]*P.O. Box 500 Station A/,'').replace(/^[\W\n]*Toronto, ON/,'').replace(/^[\W\n]*Canada, M5W 1E6/,'').replace(/^[\W\n]*Toll-free.+/,'').replace(/^[\W\n]*1-866.+/g, '').replace(/1-866-220-6045/g, '').replace(/^[\W\n]*TTY\/Teletype write.+/, '').replace(/^[\W\n]*It is a priority for CBC to create a website that is accessible to all Canadians including people with visual, hearing, motor and cognitive challenges./, '').replace(/^[\W\n]*Closed Captioning and Described Video is available for many CBC shows offered on CBC Gem./, '').replace(/Welcome to your feed!.+/,'').replace(/To encourage thoughtful and respectful conversations, first and last names.+/,'').replace(/By submitting a comment, you accept that CBC has the right.+/,'')).reduce((a,b)=> a+'\n'+b);
  return elmsText.trim();
}
function rollstoneAutoText(){
  var elmsText = Array.from(document.querySelectorAll("p")).filter(el=> el.innerText).map(el=> el.innerText.replace(/In This Article.*/,'').replace(/Want more Rolling Stone.*/,'').replace(/Newsletter Signup.*/,'').replace(/Have a Tip.*/,'')).reduce((a,b)=> a+'\n'+b);
  return elmsText.trim();
}

function wpAutoText(){
  var elmsText = Array.from(document.querySelectorAll("p, h2")).filter(el=> el.innerText && /class/.test(el.outerHTML) === false).map(el=> el.innerText).reduce((a,b)=> a+'\n'+b);
  return elmsText.trim();
}

function reutersAutoText() {
  var elmsText = Array.from(document.querySelectorAll("p, h3")).filter(el=> el.innerText).map(el=> el.innerText.replace(/^[\W\n]*\d+\s*MIN READ[\W\n]*/,'').replace(/.+?Reuters. All Rights Reserved./g,'').replace(/All quotes delayed a minimum of.+/,'').replace(/Subscribe to our daily curated newsletter.+/,'').replace(/REUTERS NEWS NOW/,'')).reduce((a,b)=> a+'\n'+b);
  return elmsText.trim();
}

async function nytAutoText() {
  var res = await fetch(window.location.href);
  var text = await res.text();
  var doc = new DOMParser().parseFromString(text,'text/html');
  var paras = Array.from(tn(doc,'p')).map(el=> el.innerText.replace(/^[\W\n]*Advertisement[\W\n]*$|^[\W\n]*Supported by[\W\n]*$/g,'')).reduce((a,b)=> a+'\n'+b).replace(/\[.+?\]/g, '');
  return paras.trim();
}

function getSelectionText() {
  var text = "";
  if (window.getSelection) text = window.getSelection().toString();
  if (document.selection && document.selection.type != "Control") text = document.selection.createRange().text;
  return text;
}

function economistAutoText(){
  var elmsText = Array.from(document.querySelectorAll("p, h2")).filter(el=> el.innerText).map(el=> el.innerText).reduce((a,b)=> a+'\n'+b);
  return elmsText.trim().replace(/You’ve seen the news, now discover the story[\w\W\n]*/,'').replace(/Upgrade your inbox and get our Daily Dispatch and Editor's Picks./,'');
}

async function grabTextContent(){ 
  var sel = getSelectionText().trim();
  var url = window.location.href;
  if(sel == false){
    if(/reuters\.com\/article\/\w/.test(url)) var sel = reutersAutoText();
    if(/washingtonpost\.com/.test(url)) var sel = wpAutoText();
    if(/rollingstone\.com\/\w+/.test(url)) var sel = rollstoneAutoText();
    if(/\.cbc.ca\/\w+/.test(url)) var sel = cbcAutoText();
    if(/\bbbc\.com\/\w+/.test(url)) var sel = bbcAutoText();
    if(/\blatimes.com\/\w+/.test(url)) var sel = latimesAutoText();
    if(/news\.yahoo\.com\/\w+/.test(url)) var sel = yahooAutoText();
    if(/\beconomist.com\/\w/.test(url)) var sel = economistAutoText();
    if(/news\.harvard\.edu\/\w+/.test(url)) var sel = harvardAutoText();
    if(/nytimes\.com\/\d{4}\//.test(url)) var sel = await nytAutoText();
  }
  return sel;
}

var svgs = {
  close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
  play: `<svg width="24px" height="24px" viewBox="0 0 11 14" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-753, -955)"><g transform="translate(100, 852)"><g id="-Round-/-AV-/-play_arrow" transform="translate(646, 98)"><g><rect x="0" y="0" width="24" height="24"/><path d="M7,6.82 L7,17.18 C7,17.97 7.87,18.45 8.54,18.02 L16.68,12.84 C17.3,12.45 17.3,11.55 16.68,11.15 L8.54,5.98 C7.87,5.55 7,6.03 7,6.82 Z" id=" Icon-Color" fill="#14b370"/></g></g></g></g></g></svg>`,
  pause: `<svg width="24px" height="24px" viewBox="0 0 6 8" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-227, -3765)" fill="#e21212"><g id="icons" transform="translate(56, 160)"><path d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606"/></g></g></g></svg>`,
  stop: `<svg width="24px" height="24px" viewBox="0 0 12 12" version="1.1"><g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Rounded" transform="translate(-106, -1044)"><g id="AV" transform="translate(100, 852)"><g id="-Round-/-AV-/-stop" transform="translate(0, 186)"><g><rect id="Rectangle-Copy-74" x="0" y="0" width="24" height="24"/><path d="M8,6 L16,6 C17.1,6 18,6.9 18,8 L18,16 C18,17.1 17.1,18 16,18 L8,18 C6.9,18 6,17.1 6,16 L6,8 C6,6.9 6.9,6 8,6 Z" fill="#e21212"/></g></g></g></g></g></svg>`
};


function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}


function dragElement() {
  var el = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
    el.style.opacity = "0.85";
    el.style.transition = "opacity 700ms";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
  }
}

function showLastWord(pos) {
  var spans = Array.from(cn(document, 'wordStrmArr'));
  var targs = spans.slice(0, (pos));
  if (targs && targs.length > 0) {
    targs.forEach(el => {
      el.style.borderBottom = '1.4px solid #08709c';
      el.style.borderRadius = '0em';
      el.style.opacity = '.7';
      el.style.fontSize = '.7em';
    });
    var last = spans.slice((pos), (pos + 11));
    var i = last.map(el => /”|,|\.|\s/.test(el.innerText)).indexOf(true);
    var chop = last.slice(0, i + 1);
    chop.forEach(el => {
      el.style.borderRadius = '0em';
      el.style.borderBottom = '1.4px solid #08709c';
      el.style.opacity = '.3';
      el.style.fontSize = '.7em';
      el.style.transition = 'all 206ms';
      el.addEventListener('transitionend', () => {
        el.style.opacity = '.7';
      });
    });
  }
}


var opts = [
  ["de-DE", "Deutsch"],
  ["en-US", "English US"],
  ["en-GB", "English UK"],
  ["es-ES", "Español"],
  ["es-US", "Español de Estados Unidos"],
  ["fr-FR", "Français"],
  ["hi-IN", "हिन्दी"],
  ["id-ID", "Bahasa Indonesia"],
  ["it-IT", "Italiano"],
  ["ja-JP", "日本語"],
  ["nl-NL", "Nederlands"],
  ["pl-PL", "Polski"],
  ["pt-BR", "Português do Brasil"],
  ["ru-RU", "русский"],
  ["ko-KR", "한국의"],
  ["zh-CN", "普通话（中国大陆）"],
  ["zh-HK", "粤語（香港）"],
  ["zh-TW", "國語（臺灣）"]
];

function hoverin() {
  this.style.background = '#143442';
  this.style.color = '#fff';
  this.style.transition = 'all 133ms';
}
function hoverout() {
  this.style.background = '#fff';
  this.style.color = '#143442';
  this.style.transition = 'all 133ms';
}

function languageSelector() {
  var rect = this.getBoundingClientRect();
  var selWindow = ele('div');
  attr(selWindow, 'id', 'selection_window');
  attr(selWindow, 'style', `position: fixed; top: ${rect.top}px; left: ${rect.left}px; padding: 4px; z-index: ${new Date().getTime()}; border-radius: 0.3em;`);
  document.body.appendChild(selWindow);
  selWindow.onmouseleave = ()=> {
    if(gi(document, 'selection_window')){gi(document, 'selection_window').outerHTML = '';};
  };
  for (var i = 0; i < opts.length; i++) {
    var langOptions = ele('div');
    attr(langOptions, 'dataLang', opts[i][0]);
    attr(langOptions, 'style', `padding: 4px; cursor: pointer; border: 1.2px solid #143442; background: #fff; color: #143442; ${(i == 0) ? 'border-top-left-radius: 0.4em; border-top-right-radius: 0.4em;' : (i == opts.length-1) ? 'border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em;' : ''}`);
    langOptions.innerText = opts[i][1];
    langOptions.onclick = selectLang;
    selWindow.appendChild(langOptions);
    langOptions.onmouseenter = hoverin;
    langOptions.onmouseleave = hoverout;
  }
}

function selectLang() {
  var sel = this.innerText;
  var drop = gi(document, 'language_selection');
  drop.setAttribute('dataLang', this.getAttribute('dataLang'));
  drop.innerHTML = sel;
  gi(document, 'selection_window').outerHTML = '';
}


async function playSelection() {
  var textDefault = 'This is a test of speaking like a human. Hopefully this will help you recognize that robots are humans too... You monster.';
  var selectedWinText = await grabTextContent();
  var selText = selectedWinText ? selectedWinText : textDefault;
  if (gi(document, 'tts_viewer_pop')) gi(document, 'tts_viewer_pop').outerHTML = '';

  var cont = ele('div');
  attr(cont, 'id', 'tts_viewer_pop');
  attr(cont, 'style', `position: fixed; top: 10px; left: 60px; width: 680px; z-index: ${new Date().getTime()}; font-size: 16px; font-family: "Georgia", Sarif;`);
  document.body.appendChild(cont);

  var head = ele('div');
  attr(head, 'style', `display: grid; grid-template-columns: ${(4*16)}px ${(4*16)}px 190px 218px 30px 30px 33px; grid-gap: 1%; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var slab = ele('div');
  attr(slab, 'style', `grid-area: 1 / 1; color: #fff; padding: 6px; border-radius: 0.4em; text-align: center; transform: translate(0px, 3px)`);
  slab.innerText = 'speed';
  head.appendChild(slab);

  var speed = ele('div');
  attr(speed, 'contentEditable', 'true');
  attr(speed, 'id', 'speed_selection');
  attr(speed, 'style', 'height: 30px; text-align: center; grid-area: 1 / 2; border-radius: 0.3em; background: #fff; color: #1c1c1c; padding: 6px; border-radius: 0.3em; cursor: text; transform: translate(0px, 3px) scale(0.8, 0.8);');
  speed.innerText = '1.7';
  head.appendChild(speed);

  var lang_ = ele('div');
  attr(lang_, 'style', `height: 36px; text-align: center; grid-area: 1 / 4; background: #162830; color: #fff; border: 1px solid #122e3b; border-radius: 0.2em; cursor: pointer; transform: translate(0px, 3px) scale(0.8, 0.8); padding: 8px; box-shadow: 0px 1px 1px 1px #143442;`);
  attr(lang_, 'id', 'language_selection');
  attr(lang_,'datalang','en-US');
  lang_.innerText = 'English US';
  head.appendChild(lang_);
  lang_.onclick = languageSelector;

  var play = ele('div');
  attr(play, 'playing', 'off');
  attr(play, 'id', 'play_btn_');
  attr(play, 'style', `grid-area: 1 / 5; width: 28px; height: 28px; cursor: pointer; transform: translate(0px, 9px);`);
  play.innerHTML = svgs.play;
  head.appendChild(play);

  var stp = ele('div');
  attr(stp, 'style', `grid-area: 1 / 6; width: 28px; height: 28px; cursor: pointer; transform: translate(0px, 9px);`);
  stp.innerHTML = svgs.stop;
  head.appendChild(stp);

  var cls = ele('div');
  attr(cls, 'style', `grid-area: 1 / 7; width: 44px; height: 44px; cursor: pointer;`);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;

  var cbod = ele('div');
  attr(cbod, 'style', `border-bottom-left-radius: 0.4em; border-bottom-left-radius: 0.4em;`);
  cont.appendChild(cbod);

  var text = ele('div');
  attr(text, 'contentEditable', 'true');
  attr(text, 'id', 'tts_viewer_text');
  attr(text, 'style', `background: #162830; color: #fff; text-align: left; border: 1.6px solid #0a1114; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; max-height: ${(screen.height *0.7)}px; overflow-y: auto; padding: 18px;`);
  cbod.appendChild(text);
  text.innerHTML = selText;

  speed.onfocus = () => {
    slab.style.transform = 'translate(10px, 3px)';
    slab.style.opacity = '.3';
    slab.style.transition = 'all 103ms ease-in';
    slab.addEventListener('transitionend', () => {
      slab.style.opacity = '1';
    });
  };
  speed.onblur = () => {
    slab.style.transform = 'translate(0px, 3px)';
  };

  stp.onclick = () =>{
    attr(text, 'contentEditable', 'true');
    attr(play, 'playing', 'stopped');
    synth.cancel();
    play.innerHTML = svgs.play;
  };

  cls.onclick = () => {
    if(gi(document, 'selection_window')){gi(document, 'selection_window').outerHTML = '';};
    try{ synth.cancel();} catch(err){console.log(err)}
    cont.outerHTML = '';
  };

  var pi = 1;
  play.onclick = () => {
    var ca = play.getAttribute('playing');
    if (ca == 'off') {
      text.innerHTML = '<span class="wordStrmArr">' + formatDivContentAsString(text.innerHTML).split("").reduce((a, b) => a + `</span><span class="wordStrmArr">` + b) + '</span>';
      initSpeech(ca);
      play.innerHTML = svgs.pause;
    }
    if (ca == 'stopped') {
      initSpeech(ca);
      play.innerHTML = svgs.pause;
    }
    if (ca == 'pause' && ca != 'off') {
      attr(play, 'playing', 'play');
      play.innerHTML = svgs.play;
      synth.pause();
    }
    if (ca == 'play' && ca != 'off') {
      attr(play, 'playing', 'pause');
      play.innerHTML = svgs.pause;
      synth.resume();
    }
  };
}
function addSpansToText(textElm){
  textElm.innerHTML = '<span class="wordStrmArr">' + formatDivContentAsString(textElm.innerHTML).split("").reduce((a, b) => a + `</span><span class="wordStrmArr">` + b) + '</span>';
}

function initSpeech(status){
  var text = gi(document,'tts_viewer_text');
  var play = gi(document,'play_btn_');
  var speed = formatDivContentAsString(gi(document,'speed_selection').innerText);
  var lang = gi(document,'language_selection').getAttribute('datalang');
  var rate = /[\d\.]+/.test(speed) ? reg(/[\d\.]+/.exec(speed), 0): 1;
  if(status == 'stopped'){
    var textElm = gi(document,'tts_viewer_text');
    var spans = Array.from(tn(textElm,'span')).filter(el=> el.style.borderBottomStyle == 'solid');
    spans.pop();
    spans.reverse();
    var pos = ( (spans.length) - (spans.map(el => /\s/.test(el.innerText)).indexOf(true)) ) -1;
    for(var i=0; i<pos; i++){
	  textElm.removeChild(tn(textElm,'span')[0]);
    }
    addSpansToText(gi(document,'tts_viewer_text'));
  }
  synth = window.speechSynthesis;
  utterThis = new SpeechSynthesisUtterance(formatDivContentAsString(gi(document,'tts_viewer_text').innerHTML) ? formatDivContentAsString(text.innerHTML) : textDefault);
  utterThis.lang = lang;
  utterThis.pitch = 1;
  utterThis.rate = rate;
  utterThis.onend = (e) => {
    synth.cancel();
  };
  utterThis.onboundary = (e) => {
    showLastWord(e.charIndex);
  };
  attr(text, 'contentEditable', 'false');
  attr(play, 'playing', 'pause');
  synth.speak(utterThis);
}

playSelection();

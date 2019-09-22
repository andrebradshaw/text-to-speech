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


var formatDivContentAsString = (s) => noHtmlEntities(s.replace(/<span>|<br>/g, '\n').replace(/<.+?>/g, '').trim());

var svgs = {
  close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
  play: `<svg version="1.1" x="0px" y="0px" viewBox="0 0 101 101" style="enable-background:new 0 0 100.25 100.25;" xml:space="preserve">
<g>	<path fill="#14b370" d="M69.817,48.243l-30-19.5c-0.461-0.3-1.05-0.322-1.533-0.061c-0.483,0.263-0.785,0.769-0.785,1.318v39   c0,0.55,0.301,1.056,0.785,1.318c0.224,0.121,0.47,0.182,0.715,0.182c0.285,0,0.57-0.081,0.817-0.242l30-19.5   c0.426-0.276,0.683-0.75,0.683-1.258S70.243,48.519,69.817,48.243z M40.5,66.237V32.764L66.248,49.5L40.5,66.237z"/>
	<path fill="#14b370"  d="M49.5,6.5c-23.71,0-43,19.29-43,43s19.29,43,43,43s43-19.29,43-43S73.21,6.5,49.5,6.5z M49.5,89.5   c-22.056,0-40-17.944-40-40s17.944-40,40-40s40,17.944,40,40S71.556,89.5,49.5,89.5z"/>
</g></svg>`,
  pause: `<svg version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129">  <g>    <g>   <path fill="#eb4034" d="m64.5,122.6c32.1,0 58.1-26.1 58.1-58.1s-26-58.1-58.1-58.1-58.1,26-58.1,58.1 26,58.1 58.1,58.1zm0-108.1c27.5,0 50,22.4 50,50s-22.4,50-50,50-50-22.4-50-50 22.5-50 50-50z"/>      <path fill="#e21212" d="m53.8,94.7c2.3,0 4.1-1.8 4.1-4.1v-53.1c0-2.3-1.8-4.1-4.1-4.1-2.3,0-4.1,1.8-4.1,4.1v53.1c7.10543e-15,2.3 1.8,4.1 4.1,4.1z"/>  <path fill="#e21212" d="m75.2,94.7c2.3,0 4.1-1.8 4.1-4.1v-53.1c0-2.3-1.8-4.1-4.1-4.1-2.3,0-4.1,1.8-4.1,4.1v53.1c-1.42109e-14,2.3 1.8,4.1 4.1,4.1z"/>    </g>  </g></svg>`,
  stop: `<svg version="1.1" x="0px" y="0px" viewBox="0 0 100.25 100.25" style="enable-background:new 0 0 100.25 100.25;" xml:space="preserve"><g><path fill="#e21212" d="M49.5,7.5c-23.71,0-43,19.29-43,43s19.29,43,43,43s43-19.29,43-43S73.21,7.5,49.5,7.5z M49.5,90.5 c-22.056,0-40-17.944-40-40s17.944-40,40-40s40,17.944,40,40S71.556,90.5,49.5,90.5z"/><path fill="#e21212" d="M65,33.5H34c-0.829,0-1.5,0.672-1.5,1.5v31c0,0.828,0.671,1.5,1.5,1.5h31c0.829,0,1.5-0.672,1.5-1.5V35   C66.5,34.172,65.829,33.5,65,33.5z M63.5,64.5h-28v-28h28V64.5z"/></g></svg>`
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

function getSelectionText() {
  var text = "";
  if (window.getSelection) text = window.getSelection().toString();
  if (document.selection && document.selection.type != "Control") text = document.selection.createRange().text;
  return noHtmlEntities(reChar(formatDivContentAsString(text)));
}


function showLastWord(pos) {
  var spans = Array.from(cn(document, 'wordStrmArr'));
  var targs = spans.slice(0, (pos));
  if (targs && targs.length > 0) {
    targs.forEach(el => {
      el.style.borderBottom = '1.4px solid #08709c';
      el.style.borderRadius = '0em';
      el.style.opacity = '.7';
    });
    var last = spans.slice((pos), (pos + 11));
    var i = last.map(el => /”|,|\.|\s/.test(el.innerText)).indexOf(true);
    var chop = last.slice(0, i + 1);
    chop.forEach(el => {
      el.style.borderRadius = '0em';
      el.style.borderBottom = '1.4px solid #08709c';
      el.style.opacity = '.3';
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
  this.style.background = '#15536e';
  this.style.color = '#fff';
  this.style.transition = 'all 133ms';
}
function hoverout() {
  this.style.background = '#fff';
  this.style.color = '#15536e';
  this.style.transition = 'all 133ms';
}

function languageSelector() {
  var rect = this.getBoundingClientRect();
  var selWindow = ele('div');
  attr(selWindow, 'id', 'selection_window');
  attr(selWindow, 'style', `position: fixed; top: ${rect.top}px; left: ${rect.left}px; padding: 4px; z-index: 15211; border-radius: 0.3em;`);
  document.body.appendChild(selWindow);
  selWindow.onmouseleave = ()=> {
    if(gi(document, 'selection_window')){gi(document, 'selection_window').outerHTML = '';};
  };

  for (var i = 0; i < opts.length; i++) {
    var langOptions = ele('div');
    attr(langOptions, 'dataLang', opts[i][0]);
    attr(langOptions, 'style', `padding: 4px; cursor: pointer; border: 1.2px solid #15536e; background: #fff; color: #15536e; ${(i == 0) ? 'border-top-left-radius: 0.4em; border-top-right-radius: 0.4em;' : (i == opts.length-1) ? 'border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em;' : ''}`);
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
  var selText = getSelectionText() ? getSelectionText() : textDefault;
  var synth = window.speechSynthesis;
  if (gi(document, 'tts_viewer_pop')) gi(document, 'tts_viewer_pop').outerHTML = '';

  var cont = ele('div');
  attr(cont, 'id', 'tts_viewer_pop');
  attr(cont, 'style', `position: fixed; top: 10%; left: 60px; width: 680px; z-index: 13120; font-size: 16px; font-family: "Georgia", Sarif;`);
  document.body.appendChild(cont);

  var head = ele('div');
  attr(head, 'style', `display: grid; grid-template-columns: ${(4*16)}px ${(4*16)}px 200px 219px 30px 30px 33px; grid-gap: 1%; background: #041e29; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move; padding: 6px`);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var slab = ele('div');
  attr(slab, 'style', 'grid-area: 1 / 1; color: #fff; padding: 6px; border-radius: 0.4em; text-align: center');
  slab.innerText = 'speed';
  head.appendChild(slab);

  var speed = ele('div');
  attr(speed, 'contentEditable', 'true');
  attr(speed, 'style', 'grid-area: 1 / 2; border-radius: 0.3em; background: #fff; color: #1c1c1c; padding: 6px; border-radius: 0.3em; cursor: text; transform: scale(0.8, 0.8);');
  speed.innerText = '1.2';
  head.appendChild(speed);

  var lang_ = ele('div');
  attr(lang_, 'style', `textAlign: center; grid-area: 1 / 4; background: #15536e; color: #fff; border: 1px solid #073b52; border-radius: 0.2em; cursor: pointer; transform: scale(0.8, 0.8); padding: 8px; box-shadow: 1px 1px 1px 1px #043347;`);
  attr(lang_, 'id', 'language_selection');
  attr(lang_,'datalang','en-US');
  lang_.innerText = 'English US';
  head.appendChild(lang_);
  lang_.onclick = languageSelector;

  var play = ele('div');
  attr(play, 'playing', 'off');
  attr(play, 'style', `grid-area: 1 / 5; width: 28px; height: 28px; cursor: pointer;`);
  play.innerHTML = svgs.play;
  head.appendChild(play);

  var stp = ele('div');
  attr(stp, 'style', `grid-area: 1 / 6; width: 28px; height: 28px; cursor: pointer;`);
  stp.innerHTML = svgs.stop;
  head.appendChild(stp);

  var cls = ele('div');
  attr(cls, 'style', `grid-area: 1 / 7; width: 33px; height: 33px; cursor: pointer;`);
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
  attr(text, 'style', `background: #043347; color: #fff; padding: 10px; text-align: left; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; max-height: ${(screen.height *0.7)}px; overflow-y: auto; padding: 18px;`);
  cbod.appendChild(text);
  text.innerHTML = selText;

  speed.onfocus = () => {
    slab.style.transform = 'translate(10px, 0px)';
    slab.style.opacity = '.3';
    slab.style.transition = 'all 133ms ease-in';
    slab.addEventListener('transitionend', () => {
      slab.style.opacity = '1';
    });
  };
  speed.onblur = () => {
    slab.style.transform = 'translate(0px, 0px)';
  };

  stp.onclick = () =>{
    attr(play, 'playing', 'off');
    synth.cancel();
  };

  cls.onclick = () => {
    if(gi(document, 'selection_window')){gi(document, 'selection_window').outerHTML = '';};
    synth.cancel();
    cont.outerHTML = '';
  };

  var pi = 1;

  play.onclick = () => {
    var lang = gi(document,'language_selection').getAttribute('datalang');
    var ca = play.getAttribute('playing');

    if (ca == 'off') {
      text.innerHTML = '<span class="wordStrmArr">' + formatDivContentAsString(text.innerHTML).split("").reduce((a, b) => a + `</span><span class="wordStrmArr">` + b) + '</span>';
      var rate = /[\d\.]+/.test(speed.innerHTML) ? reg(/[\d\.]+/.exec(formatDivContentAsString(speed.innerHTML)), 0): 1.3;

      utterThis = new SpeechSynthesisUtterance(formatDivContentAsString(text.innerHTML) ? formatDivContentAsString(text.innerHTML) : textDefault);
      utterThis.lang = lang;
      utterThis.pitch = pi;
      utterThis.rate = rate;

      utterThis.onend = (e) => {
        if (gi(document, 'tts_viewer_pop')) gi(document, 'tts_viewer_pop').outerHTML = '';
        window.speechSynthesis.cancel();
      };

      utterThis.onboundary = (e) => {
        showLastWord(e.charIndex);
      };

      attr(text, 'contentEditable', 'false');
      attr(play, 'playing', 'pause');
      play.innerHTML = svgs.pause;
      synth.speak(utterThis);
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

playSelection();

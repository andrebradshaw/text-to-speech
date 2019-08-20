var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var fixCase = (s)=> s.split(/\b-\b/).map(el=> el.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('-');
var formatDivContentAsString = (s) => s.replace(/<span>|<br>/g, '\n').replace(/<.+?>/g, '').trim();

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

  function aninCloseBtn(){
    var l1 = gi(document,'close-layer-1');
    var l2 = gi(document,'close-layer-2');
    l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
    l1.style.transition = "all 333ms";
    l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
    l2.style.transition = "all 333ms";
  }
  function anoutCloseBtn(){
    var l1 = gi(document,'close-layer-1');
    var l2 = gi(document,'close-layer-2');
    l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
    l1.style.transition = "all 333ms";
    l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
    l2.style.transition = "all 333ms";
  }

function closeView() {
  this.parentElement.parentElement.outerHTML = '';
}

function currentMessageBody(){return formatDivContentAsString(gi(document,'message_box_content').innerText) ? formatDivContentAsString(gi(document,'message_box_content').innerText) +'\n' : '';}

function removeplaceholder(){
  var current = formatDivContentAsString(this.innerHTML);
  if(current == 'Type your message...') {
    this.innerText = '';
    this.style.color = '#1c1c1c';
  }
  if(current == '') {
    this.innerText = 'Type your message...';
    this.style.color = '#7c7c7c';
  }
}

function createSavedMsgSearchView() {
  if (gi(document, 'text_to_speech_cont')) gi(document, 'text_to_speech_cont').outerHTML = "";

    var cont = ele('div');
    attr(cont, 'id', 'text_to_speech_cont');
    document.body.appendChild(cont);
    attr(cont, 'style', `position: fixed; top: ${Math.round(screen.height * 0.15)}px; max-width: ${Math.round(screen.width * 0.55)}px; right: 2%; z-index: 111111; border-radius: 0.15em;`);

    var head = ele('div');
    cont.appendChild(head);
    attr(head, 'style', 'display: grid; grid-auto-rows: 100%; grid-gap: 1%; justify-content: space-between; background: #283e4a; color: #fff; padding: 1px; border: 1.2px solid #1c1c1c; border-top-right-radius: 0.15em; border-top-left-radius: 0.15em; cursor: move;');
    head.onmouseover = dragElement;
//     head.addEventListener('mouseover', dragElement);

    var htext = ele('div');
    head.appendChild(htext);
    attr(htext, 'style', 'grid-area: 1 / 1; padding: 4px');
    htext.innerText = 'Speak to me';
//     min.addEventListener('click', minMize2Bottom);

    var cls = ele('div');
    head.appendChild(cls);
    attr(cls, 'style', 'grid-area: 1 / 2; width: 24px; height: 24px; cursor: pointer; transform: translate(0px, 5px);'); //#659C35#88C057
//     attr(cls, 'style', 'width: 24px; height: 24px');
    cls.innerHTML = `<svg id="close_icon-invite" x="0px" y="0px" viewBox="0 0 100 100">
<g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#d11124" stroke-width="8"><circle cx="50" cy="50" r="48"/><path d="M47.806834,19.6743435 L47.806834,77.2743435" id="close-layer-1" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" id="close-layer-2" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`;
    cls.onmouseenter = aninCloseBtn;
    cls.onmouseleave = anoutCloseBtn;
    cls.onclick = closeView;

    var c_bod = ele('div'); /* content body */
    cont.appendChild(c_bod);
    attr(c_bod,'style','width: 100%; display: grid; grid-auto-columns: 70% 30%; grid-gap: 12px; justify-content: center; background: #fff; color: #004471; border: 1.2px solid #1c1c1c; border-bottom-left-radius: .2em; border-bottom-right-radius: .2em; padding: 14px;'); //border-bottom-right-radius: 0.15em; border-bottom-left-radius: 0.15em; 
    attr(c_bod,'id','saved_msg_content_container');

    var msgbod = ele('div'); /* message body */
    attr(msgbod,'id','message_box_container');
    attr(msgbod,'style', 'width: 100%; grid-area: 1 / 1; background: #fff; color: #1c1c1c;');
    c_bod.appendChild(msgbod);

    var msg = ele('div'); /*message body - content editable div */
    attr(msg,'id','message_box_content');
    attr(msg,'contentEditable', 'true');
    attr(msg,'style', `max-height: ${Math.round(screen.height * 0.15)}px; max-width: ${Math.round(screen.width * 0.55)}px; background: #fff; color: #7c7c7c;`);
    msg.innerText = 'Type your message...';
    msgbod.appendChild(msg);
    msg.onfocus = removeplaceholder;
    msg.onblur = removeplaceholder;
    msg.onkeyup = (e)=>{
      if(e.key == 'Enter') playSelection()
    };

}
function playSelection(){
  var selText = currentMessageBody();
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(selText ? selText : 'Nothing selected. Select some text, homie.');
  utterThis.voice = synth.getVoices()[3];
  utterThis.pitch = '1';
  utterThis.rate = '1.2';
  synth.speak(utterThis);
}

createSavedMsgSearchView()

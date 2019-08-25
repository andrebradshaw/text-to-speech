var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

function initSpeachRecognition(){
  var imtalkinhere = [];
  var SpeechRecognition = SpeechRecognition ? SpeechRecognition : webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.start();
  recognition.onresult = (e) => {
    if( imtalkinhere[imtalkinhere.length-1] != event.results[0][0].transcript ) imtalkinhere.push(event.results[0][0].transcript);
    var output = imtalkinhere.length > 0 ? imtalkinhere.reduce( (a,b) => a +' '+ b ) : event.results[0][0].transcript;
    gi(document,'speech_text_content') ? gi(document,'speech_text_content').innerText = imtalkinhere[imtalkinhere.length-1].replace(/s\*\*\*/g,'shit').replace(/f\*\*\*/g,'fuck').replace(/a\*\*\*\*\*\*/g,'asshole') : recognition.stop();
  };
  recognition.onspeechend = () => {
    if(gi(document,'speech_text_content')){
      initSpeachRecognition();
    }else{ 
	  recognition.stop();
    }
  }
}

var color_p = {navyPurple: '#16021c', darkPurple: '#320640', whitePurple: '#f0e9f2'};

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

function createEle(obj, parent) {
  if(obj.attr && obj.attr.id) if(gi(document,obj.attr.id)) gi(document,obj.attr.id).outerHTML = '';
  var cont = ele(obj.tag);
  obj.attr ? Object.entries(obj.attr).forEach(el => attr(cont, el[0], el[1]) ) : '';
  obj.styles ? Object.entries(obj.styles).forEach(el => cont.style[el[0]] = el[1] ) : '';
  parent.appendChild(cont);
  obj.text ? cont.innerText = obj.text : '';
  obj.innerHTML ? cont.innerHTML = obj.innerHTML : '';
  return cont;
};

var mainCont = {
  tag: 'div',
  attr: {
    id: 'speech_to_text_container'
  },
  styles: {
    position: 'fixed',
	padding: '11px',
    top: '10%',
    width: '33%',
    background: 'transparent',
    zIndex: '12211',
    transition: 'all 2s ease'
  }
};

var mainHead = {
  tag: 'div',
  styles: {
	padding: '1px',
    display: 'grid',
    gridTemplateColumns: '95% 5%',
    background: color_p.darkPurple,
    border: `1.4px solid ${color_p.navyPurple}`,
	borderTopRightRadius: '0.3em',
	borderTopLeftRadius: '0.3em',
    cursor: 'move'
  }
};

var headText = {
  tag: 'div',
  styles: {
  	gridArea: '1 / 1',
	padding: '4px',
  	cursor: 'move',
	color: color_p.whitePurple
  },
  text: 'Speech to text' 
};


var headClose = {
  tag: 'div',
  attr: {
    id: 'speech_closer',
  },
  styles: {
  	gridArea: '1 / 2',
  	width: '28px', 
  	height: '28px',
  	cursor: 'pointer',
  },
  innerHTML: `<svg x="0px" y="0px" viewBox="0 0 100 100">
<g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" id="close-layer-1" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" id="close-layer-2" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`
};

var contBody = {
  tag: 'div',
  attr: {
	id: 'speech_text_content'
  },
  styles: {
    width: '100%',
    background: color_p.whitePurple,
    border: `1.4px solid ${color_p.navyPurple}`,
	borderBottomRightRadius: '0.3em',
	borderBottomLeftRadius: '0.3em',
    color: color_p.darkPurple,
    padding: '10px'  
  },
  text: 'Click me to start listening. I will stop listening when you stop speaking.'
};

var main_ = createEle(mainCont, document.body);
var head_ = createEle(mainHead, main_);
var hdesc_ = createEle(headText, head_);
var close_ = createEle(headClose, head_);
var body_ =  createEle(contBody, main_);
close_.onmouseenter = aninCloseBtn;
close_.onmouseleave = anoutCloseBtn;
close_.onclick = closeView;
head_.onmouseover = dragElement;

initSpeachRecognition()

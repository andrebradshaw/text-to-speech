var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var sessionBlock = [];

function initSpeachRecognition() {
  var imtalkinhere = [];
  var SpeechRecognition = SpeechRecognition ? SpeechRecognition : webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.start();

  recognition.onresult = (e) => {
    /* this causes the speech to stop recording, but it will still show up in the DOM until the present speech stops. move it down of you want to catch up until the current speech stops */
    if (gi(document, 'speech_recog_status') && gi(document, 'speech_recog_status').getAttribute('status') == 'off') recognition.stop(); 

    if (imtalkinhere[imtalkinhere.length - 1] != e.results[0][0].transcript) imtalkinhere.push(e.results[0][0].transcript);

    var output = imtalkinhere.length > 0 ? imtalkinhere.reduce((a, b) => a + ' ' + b) : event.results[0][0].transcript;

    var lastSpeech = imtalkinhere[imtalkinhere.length - 1].replace(/s\*\*\*/g, 'shit').replace(/f\*\*\*/g, 'fuck').replace(/a\*\*\*\*\*\*/g, 'asshole');

    gi(document, 'speech_text_content') ? gi(document, 'speech_text_content').innerText = lastSpeech : recognition.stop();

  };

  recognition.onaudioend = () => {
    if (imtalkinhere.length > 0) sessionBlock.push(imtalkinhere[imtalkinhere.length - 1]);
    if (gi(document, 'speech_text_container') && gi(document, 'speech_recog_status').getAttribute('status') == 'on') initSpeachRecognition();
    else recognition.stop();
  }

}

var color_p = {
  navyPurple: '#16021c',
  darkPurple: '#320640',
  whitePurple: '#f0e9f2',
  onGreen: '#07ba5b',
  offRed: '#e21212'
};

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
    el.style.zIndex = '15000';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
    el.style.zIndex = '11000';
  }
}

function micMouseE() {
  /* animation to show an option to turn on or off the mic */
  if (gi(document, 'mic_off_switch')) {
    gi(document, 'mic_off_switch').outerHTML = '';
  } else {
    var strokeColor = this.getAttribute('status') == 'on' ? color_p.offRed : color_p.onGreen;
    var ob = {
      tag: 'path',
      outerHTML: `<path id="mic_off_switch" stroke-width="5" stroke="${strokeColor}" d="M99,1 L0.214879662,99.7851181" class="mic_paths"/>`
    };
    var gTags = Array.from(tn(this, 'g'));
    createEle(ob, gTags[gTags.length - 1]);
  }
}

function micSwitch() {
  if (this.getAttribute('status') == 'on') {
    var rect = Array.from(tn(this,'rect'));
    rect[rect.length-1].innerHTML = ``; 
    attr(gi(document, 'mic_head_stroke'), 'stroke', color_p.offRed);
    attr(gi(document, 'mic_stand_fill'), 'fill', color_p.offRed);
    attr(this, 'status', 'off');
  } else {
    var rect = Array.from(tn(this,'rect'));
    rect[rect.length-1].innerHTML = `<animate attributeName="fill" values="${color_p.onGreen}; #079147; ${color_p.onGreen};" begin="0s" dur="2s" repeatCount="indefinite" />`;
    attr(gi(document, 'mic_head_stroke'), 'stroke', color_p.onGreen);
    attr(gi(document, 'mic_stand_fill'), 'fill', color_p.onGreen);
    attr(this, 'status', 'on');
    initSpeachRecognition()
  }
}

function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 333ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 333ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 333ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 333ms";
}

function closeView() {
  this.parentElement.parentElement.outerHTML = '';
}

function saveHover() {
  var arrow = Array.from(tn(this, 'path'))[1];
  if (this.getAttribute('status') == 'up') {
    arrow.style.transform = 'translate(0px, 12px)';
    arrow.style.transition = 'all 233ms ease-in-out';
    this.setAttribute('status', 'down');
  } else {
    arrow.style.transform = 'translate(0px, 0px)';
    arrow.style.transition = 'all 233ms ease-in-out';
    this.setAttribute('status', 'up');
  }
}

function hoverEditLog(){
  var pen = gi(document,'editLogPen');
  var path = Array.from(tn(pen,'path'));
  if(pen.getAttribute('status') == 'off'){
    path[path.length-1].setAttribute('fill',color_p.whitePurple)
    pen.setAttribute('status','on');
  }else{
    path[path.length-1].setAttribute('fill','transparent');
    pen.setAttribute('status','off');
  }
}

function updateSessionBlock() {
  var divContentAsArray = this.innerHTML.replace(/<span>|<br>/g, '\n').replace(/<.+?>/g, '').trim().split(/\n/);
  sessionBlock = divContentAsArray;
}

function downloadLogs() {
  var filename = reg(/.+\d+:\d+:\d+/.exec(new Date().toString()), 0).replace(/\s+/g, '_') + '_speechlogs.txt';
  var data = sessionBlock.length > 0 ? sessionBlock.reduce((a, b) => a + '\n' + b) : '';
  var type = 'data:text/plain;charset=utf-8,';
  var file = new Blob([data], {
    type: type
  });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 10);
  }
}

function createEle(obj, parent) {
  if (obj.attr && obj.attr.id)
    if (gi(document, obj.attr.id)) gi(document, obj.attr.id).outerHTML = '';
  var cont = ele(obj.tag);
  obj.attr ? Object.entries(obj.attr).forEach(el => attr(cont, el[0], el[1])) : '';
  obj.styles ? Object.entries(obj.styles).forEach(el => cont.style[el[0]] = el[1]) : '';
  parent.appendChild(cont);
  obj.text ? cont.innerText = obj.text : '';
  obj.innerHTML ? cont.innerHTML = obj.innerHTML : '';
  obj.outerHTML ? cont.outerHTML = obj.outerHTML : '';
  return cont;
}

var svgs = {
	pen: `<svg width="28px" height="28px" viewBox="0 0 32 32"><g fill-rule="evenodd"><g fill="${color_p.whitePurple}"><path d="M22,4 L19,4 L19,3 L18,3 L18,4 L15,4 L15,3 L14,3 L14,4 L14,4 L11,4 L11,3 L10,3 L10,4 L8.99742191,4 C7.89427625,4 7,4.88976324 7,6.00359486 L7,26.9964051 C7,28.10296 7.89092539,29 8.99742191,29 L24.0025781,29 C25.1057238,29 26,28.1102368 26,26.9964051 L26,6.00359486 C26,4.89703997 25.1090746,4 24.0025781,4 L23,4 L23,3 L22,3 L22,4 L22,4 Z M22,5 L19,5 L19,6 L18,6 L18,5 L15,5 L15,6 L14,6 L14,5 L11,5 L11,6 L10,6 L10,5 L8.9999602,5 C8.44769743,5 8,5.43891776 8,6.00307055 L8,26.9969294 C8,27.55091 8.45470893,28 8.9999602,28 L24.0000398,28 C24.5523026,28 25,27.5610822 25,26.9969294 L25,6.00307055 C25,5.44908998 24.5452911,5 24.0000398,5 L23,5 L23,6 L22,6 L22,5 L22,5 Z M10,9 L10,10 L23,10 L23,9 L10,9 L10,9 Z M10,12 L10,13 L23,13 L23,12 L10,12 L10,12 Z M10,15 L10,16 L23,16 L23,15 L10,15 L10,15 Z M10,18 L10,19 L23,19 L23,18 L10,18 L10,18 Z M10,21 L10,22 L23,22 L23,21 L10,21 L10,21 Z M10,24 L10,25 L23,25 L23,24 L10,24 L10,24 Z" /></g></g><g status="off" id="editLogPen" transform="translate(10, 5) rotate(-5)" stroke="none" stroke-width="1" fill="none"><g transform="translate(-273, -2727)"><g transform="translate(100, 2626)"><g transform="translate(170, 98)" ><g><polygon points="0 0 24 0 24 24 0 24"/><path d="M14.06,9.02 L14.98,9.94 L5.92,19 L5,19 L5,18.08 L14.06,9.02 Z M17.66,3 C17.41,3 17.15,3.1 16.96,3.29 L15.13,5.12 L18.88,8.87 L20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C18.17,3.09 17.92,3 17.66,3 Z M14.06,6.19 L3,17.25 L3,21 L6.75,21 L17.81,9.94 L14.06,6.19 Z" fill="transparent"/></g></g></g></g></g></svg>`,
	mic: `
<svg width="22px" height="22px" viewBox="0 0 103 104"><g stroke="none" stroke-width="3" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g id="mic_head_stroke" stroke-width="3.5" stroke="${color_p.onGreen}" transform="translate(-1098, -702)"><g transform="translate(1100, 704)"><rect id="mic_stand_fill" fill="${color_p.onGreen}" x="29" y="0" width="40" height="70" rx="20"><animate attributeName="fill" values="${color_p.onGreen}; #079147; ${color_p.onGreen};" begin="0s" dur="2s" repeatCount="indefinite" /></rect><path d="M79,49.9854735 C79,66.5580274 65.5721855,79.9927367 49,79.9927367 L49,79.9927367 C32.4314575,79.9927367 19,66.5601111 19,49.9854735" /><path d="M49,80 L49,100" /><path d="M29,100 L69,100" /><path d="M19,50 L22,50" /><path d="M76,50 L79,50" /></g></g></g></svg>`,
	close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="${color_p.offRed}" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
	save: `<svg x="0px" y="0px" stroke-width="3.5" stroke="${color_p.onGreen}" viewBox="0 0 101.026 101.026"><g><path d="M83.388,63.888c-0.829,0-1.5,0.671-1.5,1.5v18.5h-63v-18.5c0-0.829-0.671-1.5-1.5-1.5s-1.5,0.671-1.5,1.5v20   c0,0.829,0.671,1.5,1.5,1.5h66c0.829,0,1.5-0.671,1.5-1.5v-20C84.888,64.56,84.217,63.888,83.388,63.888z"/><path d="M49.328,69.449c0.293,0.293,0.677,0.439,1.061,0.439s0.768-0.146,1.061-0.439l13-13c0.586-0.585,0.586-1.536,0-2.121   c-0.586-0.586-1.535-0.586-2.121,0L51.89,64.767V8.388c0-0.829-0.671-1.5-1.5-1.5s-1.5,0.671-1.5,1.5v56.379L38.451,54.328   c-0.586-0.586-1.535-0.586-2.121,0c-0.586,0.585-0.586,1.536,0,2.121L49.328,69.449z"/></g></svg>`
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
    left: '8%',
    width: `${Math.round(screen.width * 0.33)}px`,
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
    gridTemplateColumns: '85% 5% 5% 5%',
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

var stopSpeech = {
  tag: 'div',
  attr: {
    id: 'speech_recog_status',
    status: 'on'
  },
  styles: {
    gridArea: '1 / 3',
    cursor: 'pointer',
    transform: 'translate(0px, 5px)'
  },
  innerHTML: svgs.mic
};

var speechClip = {
  tag: 'div',
  styles: {
    gridArea: '1/2',
    cursor: 'pointer',
    transform: 'translate(0px, 2px)'
  },
  innerHTML: svgs.pen
};

var headClose = {
  tag: 'div',
  attr: {
    id: 'speech_closer',
  },
  styles: {
    gridArea: '1 / 4',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
  },
  innerHTML: svgs.close
};

var contBody = {
  tag: 'div',
  attr: {
    id: 'speech_text_container'
  },
  styles: {
    width: '100%',
    background: color_p.whitePurple,
    border: `1.4px solid ${color_p.navyPurple}`,
    borderBottomRightRadius: '0.3em',
    borderBottomLeftRadius: '0.3em',
    padding: '10px'
  }
};

var textField = {
  tag: 'div',
  attr: {
    id: 'speech_text_content'
  },
  styles: {
    width: '100%',
    background: 'transparent',
    color: color_p.darkPurple,
    padding: '10px'
  },
  text: 'Talk to me'
};


var main_ = createEle(mainCont, document.body);
var head_ = createEle(mainHead, main_);
var hdesc_ = createEle(headText, head_);
var stop_ = createEle(stopSpeech, head_);
var logs_ = createEle(speechClip, head_);
var close_ = createEle(headClose, head_);
var body_ = createEle(contBody, main_);
var text_ = createEle(textField, body_);
close_.onmouseenter = aninCloseBtn;
close_.onmouseleave = anoutCloseBtn;
close_.onclick = closeView;
head_.onmouseover = dragElement;
stop_.onclick = micSwitch;
stop_.onmouseenter = micMouseE;
stop_.onmouseleave = micMouseE;
logs_.onclick = showSpeechLog;
logs_.onmouseenter = hoverEditLog;
logs_.onmouseleave = hoverEditLog;

function showSpeechLog() {
  if (gi(document, 'log_speech_text_container')) gi(document, 'log_speech_text_container').outerHTML = '';
  var logMainCont = {
    tag: 'div',
    attr: {
      id: 'log_speech_text_container'
    },
    styles: {
      position: 'fixed',
      padding: '11px',
      top: '30%',
      left: '12%',
      width: `${Math.round(screen.width * 0.33)}px`,
      background: 'transparent',
      zIndex: '13211',
      transition: 'all 2s ease'
    }
  };

  var logHead = {
    tag: 'div',
    styles: {
      padding: '1px',
      display: 'grid',
      gridTemplateColumns: '90% 5% 5%',
      background: color_p.darkPurple,
      border: `1.4px solid ${color_p.navyPurple}`,
      borderTopRightRadius: '0.3em',
      borderTopLeftRadius: '0.3em',
      cursor: 'move'
    }
  };

  var logText = {
    tag: 'div',
    styles: {
      gridArea: '1 / 1',
      padding: '4px',
      cursor: 'move',
      color: color_p.whitePurple
    },
    text: 'Speech logs are editable, and will save to the background.'
  };

  var logSave = {
    tag: 'div',
    attr: {
      status: 'up'
    },
    styles: {
      gridArea: '1 / 2',
      width: '28px',
      height: '28px',
      cursor: 'pointer',
    },
    innerHTML: svgs.save
  };

  var logClose = {
    tag: 'div',
    attr: {
      id: 'log_closer'
    },
    styles: {
      gridArea: '1 / 3',
      width: '32px',
      height: '32px',
      cursor: 'pointer',
    },
    innerHTML: svgs.close
  };

  var logBody = {
    tag: 'div',
    attr: {
      id: 'log_text_container',
      contentEditable: 'true'
    },
    styles: {
      width: '100%',
      background: color_p.whitePurple,
      border: `1.4px solid ${color_p.navyPurple}`,
      borderBottomRightRadius: '0.3em',
      borderBottomLeftRadius: '0.3em',
      padding: '10px'
    },
    innerHTML: sessionBlock.length > 0 ? sessionBlock.reduce((a, b) => a + '<br>' + b) : ''
  };

  var logmain_ = createEle(logMainCont, document.body);
  var loghead_ = createEle(logHead, logmain_);
  var lhtext_ = createEle(logText, loghead_);
  var lsave_ = createEle(logSave, loghead_);
  var lclos_ = createEle(logClose, loghead_);
  var logbod_ = createEle(logBody, logmain_);

  lclos_.onmouseenter = aninCloseBtn;
  lclos_.onmouseleave = anoutCloseBtn;
  lclos_.onclick = closeView;
  loghead_.onmouseover = dragElement;
  logbod_.onkeyup = updateSessionBlock;
  lsave_.onmouseenter = saveHover;
  lsave_.onmouseleave = saveHover;
  lsave_.onclick = downloadLogs;
}

initSpeachRecognition()

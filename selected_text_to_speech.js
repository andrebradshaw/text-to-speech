var formatDivContentAsString = (s) => s.replace(/<span>|<br>/g, '\n').replace(/<.+?>/g, '').trim();
function getSelectionText() {
  var text = "";
  if (window.getSelection) text = window.getSelection().toString();
  if (document.selection && document.selection.type != "Control") text = document.selection.createRange().text;
    return formatDivContentAsString(text);
}
function playSelection(){
  var selText = getSelectionText();
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(selText ? selText : 'Nothing selected.');
  var voices = synth.getVoices();
  utterThis.voice = voices[3];
  utterThis.pitch = '1';
  utterThis.rate = '1.3';
  synth.speak(utterThis);
}
playSelection()

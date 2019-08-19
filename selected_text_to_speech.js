function getSelectionText() {
  var text = "";
  if (window.getSelection) text = window.getSelection().toString();
  if (document.selection && document.selection.type != "Control") text = document.selection.createRange().text;
    return text;
}
function playSelection(){
  var selText = getSelectionText();
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(selText ? selText : 'Nothing selected. Select some text, homie.');
  utterThis.voice = synth.getVoices()[3];
  utterThis.pitch = '1';
  utterThis.rate = '1.2';
  synth.speak(utterThis);
}
playSelection()

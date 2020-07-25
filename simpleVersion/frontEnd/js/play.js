$(document).ready(function() {
  $("button").click(function() {
    const freq = Number($("#freq-entry").val());
    const duration = Number($("#duration-entry").val());
    if (Number.isNaN(freq)) {alert("Frequency must be a number");}
    else if (Number.isNaN(duration)) {alert("Duration must be a number");}
    else {
      let object = {"frequency" : freq , "duration" : duration };
      let string = JSON.stringify(object);
      let hashValue = hash(string);
      const postNote = new XMLHttpRequest();
      postNote.open("POST", `/backEnd/trackFiles/${hashValue}.json`);
      postNote.setRequestHeader("Content-Type", "text/plain");
      postNote.onreadystatechange = () => {
        if (postNote.readyState === XMLHttpRequest.DONE &&
            (postNote.status == 200 || postNote.status == 201)) {
          audioElement = document.createElement("AUDIO");
          audioElement.src = "backEnd/streams/" + hashValue;
          audioElement.play();
        }
      }
      postNote.send(string);
    }
  })
});

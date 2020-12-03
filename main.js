Webcam.set({
    width:310,
    height:280,
    image_format:'png',
    png_quality:90
});
Cam = document.getElementById("Camera");
Webcam.attach(Cam);
function dropdown(){
    if(document.getElementById("dropdown").value == "Capture Image"){
        Webcam.attach(Cam);
        console.log("webcam");
        document.getElementById("URL").style.display = "none";
        document.getElementById("FILE").style.display = "none";
        document.getElementById("Camera").style.display = "block";

        document.getElementById("main").style.height = "830px";

    }else if(document.getElementById("dropdown").value == "Type Url"){
        Webcam.reset();
        console.log("url");
        document.getElementById("URL").style.display = "block";
        document.getElementById("FILE").style.display = "none";
        document.getElementById("Camera").style.display = "none";

        document.getElementById("main").style.height = "590px";

    }else if(document.getElementById("dropdown").value == "Choose File"){
        Webcam.reset();
        console.log("file");
        document.getElementById("URL").style.display = "none";
        document.getElementById("FILE").style.display = "block";
        document.getElementById("Camera").style.display = "none";

        document.getElementById("main").style.height = "590px";

    }
}
classifier = ml5.imageClassifier('MobileNet',loaded);
classifier1 = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xk_0yZWeo/model.json',loaded);

console.log(ml5.version);

function loaded(){
    console.log("model loaded!!")
}

function capture(){
    if(document.getElementById("dropdown").value == "Capture Image"){
        Webcam.snap(function(image){
            document.getElementById("result").innerHTML = "<img id='resultImage' src="+image+">";
        });
    }else if(document.getElementById("dropdown").value == "Type Url"){
        Url = document.getElementById("URL").value;
        document.getElementById("result").innerHTML = "<img id='resultImage' src="+Url+">";
    }else if(document.getElementById("dropdown").value == "Choose File"){
        File = document.getElementById("FILE").files;
        console.log(File);
        var reader = new FileReader;
        reader.onload = function(event){
            document.getElementById("result").innerHTML = "<img id='resultImage' src="+event.target.result+">";
            console.log(event);
        };
        base = reader.readAsDataURL(File[0]);
    }
   
}
function speak(word){
    speech = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(word);
    speech.speak(utterThis);
}
function identify(){
    classifier.classify(document.getElementById("resultImage"),check);
    classifier1.classify(document.getElementById("resultImage"),check1);
}
function check(error,result){
    if(error){
        console.log(error);
    }else if(result){
        console.log(result);
        document.getElementById("case1").innerHTML = "MobileNet says - "+result[0].label;
        output = result[0].label;
        speak(output);
    }
}
function check1(error,result){
    if(error){
        console.log(error);
    }else if(result){
        console.log(result);
        document.getElementById("case2").innerHTML = "Teachable machine model says - "+result[0].label;
        output = result[0].label;
        speak(output);
    }
}
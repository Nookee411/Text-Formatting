    let button = document.getElementById("convert");
    let timerStart = document.getElementById("button timer");
    let timerValue = document.getElementById("timerCounter");
    let timerOutput = document.getElementById("timerOutput");
    let isTimerGoes = false;
    let intervalID;
    timerOutput.style.display ="none";
    timerValue.defaultValue = "00:30:03";
    timerStart.addEventListener("click",()=>{
        if(!isTimerGoes){
            isTimerGoes = true;
            timerValue.style.display ="none";
            timerOutput.style.display ="block";
            timerStart.innerText = "Стоп";
            let rawTime = timerValue.value.toString();
            debugger;
            rawTime = rawTime.split(":");
            let hours = Number.parseInt(rawTime[0]) | 0;
            let minutes = Number.parseInt(rawTime[1]) | 0;
            let seconds = Number.parseInt(rawTime[2]) | 0;
            countdownTime(hours,minutes,seconds);
            
        }
        else{
            timerStop();
        }
    });

    function countdownTime(hours,minutes,seconds){
        
        let stringTime = formatTime(hours) + ":"+
        formatTime(minutes) + ":" +
        formatTime(seconds);
        timerOutput.innerText = stringTime;
        debugger;
        intervalID = setInterval(()=>{
            seconds--;
            if(seconds<=0){
                if(minutes===0&&hours===0){
                    timerStop();
                    alert("Timer Out!");
                }
                debugger;
                if(minutes===0){
                    hours--;
                    minutes=60;
                }
                minutes--;
                seconds=59;

            }
            
            stringTime = formatTime(hours) + ":"+
            formatTime(minutes) + ":" +
            formatTime(seconds);
            timerOutput.innerText = stringTime;
        },1000);
    }

    function formatTime(time){
        if(Math.abs(time)<10)
        return "0"+time;
        return time;
    }
    function timerStop(){
            isTimerGoes = false;
            timerValue.style.display ="inline";
            timerOutput.style.display ="none";
            timerStart.innerText = "Старт";
            clearInterval(intervalID);
    }
    
    button.addEventListener("click",()=>{
        let textBox = document.getElementById("textArea");
        let text =textBox.value;
        textBox.value = text.replaceAll(" \n", "\n");

    })

    /***
     * @param {String} text
     * @return {Number}
     */
    function countSymbols(text){
        let total =0;
        for (let char of text)
            if (char !== " ")
                total++;
        return total;
    }

    function  updateSymbols(){
        let textBox = document.getElementById("textArea");
        let text =textBox.value;
        document.getElementById("totalSymbols").innerText = text.length;
        document.getElementById("totalClearSymbols").innerText = countSymbols(text);
    }

    function getSelectionText() {
        let text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    function handleSelection(){
        let selectedSymbols = document.getElementById("selectedSymbols");
        let text = getSelectionText();
        if(text)
            selectedSymbols.innerText = text.length; 
        else
            selectedSymbols.innerText = countSymbols(text);
    }


    function isLetter(c) {
        return c.toLowerCase() !== c.toUpperCase();
    }

    let textArea  = document.getElementById("textArea");
    textArea.addEventListener("input",()=>{
        updateSymbols();
    })

    textArea.addEventListener("mouseup",()=>{
        handleSelection();
    });

    textArea.addEventListener("keyup",()=>{
        handleSelection();
    });

   
    let button = document.getElementById("convert");
    let intervalID;

    //TODO add saving to file


    class Timer{
        #isTimerGoes;
        constructor(buttonStart,timerInput,timerOutput) {
            this.timerStart = document.getElementById(buttonStart);
            this.timerValue = document.getElementById(timerInput);
            this.timerOutput = document.getElementById(timerOutput);
            this.timerOutput.style.display ="none";
            this.timerValue.defaultValue = "00:30:03";
            this.#isTimerGoes = false;
            this.timerStart.addEventListener("click",()=>{
                if(!this.#isTimerGoes){
                    this.start()
                }
                else{
                    this.stop();
                }
            });

        }
        static #formatTime(time){
            if(Math.abs(time)<10)
                return "0"+time;
            return time;
        }



        start(){
            this.#isTimerGoes = true;
            this.timerValue.style.display ="none";
            this.timerOutput.style.display ="block";
            this.timerStart.innerText = "Стоп";
            let rawTime = this.timerValue.value.toString();
            rawTime = rawTime.split(":");
            let hours = +rawTime[0] | 0;
            let minutes = +rawTime[1] | 0;
            let seconds = +rawTime[2] | 0;
            this.#tick(hours,minutes,seconds);
        }
        stop(){
            this.#isTimerGoes = false;
            this.timerValue.style.display ="inline";
            this.timerOutput.style.display ="none";
            this.timerStart.innerText = "Старт";
            clearInterval(intervalID);
        }
        #tick(hours,minutes,seconds){
            let stringTime =  Timer.#formatTime(hours) + ":"+
                Timer.#formatTime(minutes) + ":" +
                Timer.#formatTime(seconds);
            this.timerOutput.innerText = stringTime;
            debugger;
            intervalID = setInterval(()=>{
                seconds--;
                if(seconds<=0){
                    if(minutes===0&&hours===0){
                        this.stop();
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

                stringTime = Timer.formatTime(hours) + ":"+
                    Timer.formatTime(minutes) + ":" +
                    Timer.formatTime(seconds);
                this.timerOutput.innerText = stringTime;
            },1000);
        }
    }

    let timer = new Timer("button timer","timerCounter","timerOutput");

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
        document.getElementById("totalClearSymbols").innerText = countSymbols(text).toString();
    }

    function getSelectionText() {
        let text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type !== "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    function handleSelection(){
        let selectedSymbols = document.getElementById("selectedSymbols");
        let text = getSelectionText();
        if(text)
            selectedSymbols.innerText = text.length.toString();
        else
            selectedSymbols.innerText = countSymbols(text).toString();
    }


    function isLetter(c) {
        return c.toLowerCase() !== c.toUpperCase();
    }

    let textArea  = document.getElementById("textArea");
    textArea.addEventListener("input",()=>{
        updateSymbols();
    })

    document.addEventListener("selectionchange",()=>{
        if(textArea ===document.activeElement)
            handleSelection();
    });
    let button = document.getElementById("convert");
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

    function isLetter(c) {
        return c.toLowerCase() !== c.toUpperCase();
    }

    let textArea  = document.getElementById("textArea");
    textArea.addEventListener("input",()=>{
        updateSymbols();
    })

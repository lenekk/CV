import { Text } from "pixi.js";

export const writeMessage = (msg : string, textInstance : Text) => {
        
    let currentMessage = ""
    let i = 0;

    const writing =(i : number) => {
        currentMessage = msg.substring(0, i) 
        textInstance.text = currentMessage 
    }
    const interval = setInterval(() => {
        i++
        writing(i)
    }, 50)
    
    if(i == msg.length){
        clearInterval(interval);
    }
}

export const copyToClipboard = (msg : string) => {
    const element = document.createElement("textarea")
    element.value = msg
    document.body.appendChild(element)
    element.focus()
    element.select()
    element.setSelectionRange(0, 99999);
    try{
        //document.execCommand('copy');
        navigator.clipboard.writeText(msg)
    }catch (err) {
            console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(element);
    alert("Skopiowano: " + element.value);
}
import { Text } from "pixi.js";
import { sound } from "@pixi/sound"



export const writeMessage = (msg : string, textInstance : Text) => {
        
    let currentMessage = ""
    let i = 0;

    const writing =(i : number) => {
        if(!textInstance.dirty){
            currentMessage = msg.substring(0, i)
            //console.log(currentMessage);
            sound.play("keySound", {singleInstance : true})
            textInstance.text = currentMessage 
        }else{
            sound.stop("keySound")
            clearInterval(interval)
        }

    }
    const interval = setInterval(() => {
        i++
        writing(i)
        //console.log(textInstance.dirty);
        if(i == msg.length){
            sound.stop("keySound")
            clearInterval(interval);
        }
    }, 80)    
   
}

export const copyToClipboard = (msg : string) => {
    let success : boolean = false;
    const element = document.createElement("textarea")
    element.value = msg
    document.body.appendChild(element)
    element.focus()
    element.select()
    element.setSelectionRange(0, 99999);
    try{
        document.execCommand('copy');
        //navigator.clipboard.writeText(msg)
        success = true;
    }catch (err) {
            console.error('Unable to copy to clipboard', err);
            success = false;
    }
    document.body.removeChild(element);
    return success
}
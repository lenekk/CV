import { Assets, Text } from "pixi.js";
import { Sound } from "@pixi/sound"



export const writeMessage = (msg : string, textInstance : Text) => {
        
    let currentMessage = ""
    let i = 0;

    const click = Sound.from(Assets.get("keySound"))
    click.singleInstance = true;
    click.speed = .2

    const writing =(i : number) => {
        if(!textInstance.dirty){
            currentMessage = msg.substring(0, i)
            click.play()
            textInstance.text = currentMessage 
        }else{
            click.stop()
            clearInterval(interval)
        }

    }
    const interval = setInterval(() => {
        i++
        writing(i)
        console.log(textInstance.dirty);
        if(i == msg.length){
            click.stop()
            clearInterval(interval);
        }
    }, 50)    
   
}

export const copyToClipboard = (msg : string) => {
    const element = document.createElement("textarea")
    element.value = msg
    document.body.appendChild(element)
    element.focus()
    element.select()
    element.setSelectionRange(0, 99999);
    try{
        document.execCommand('copy');
        //navigator.clipboard.writeText(msg)
    }catch (err) {
            console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(element);
    alert("skopiowano")
}
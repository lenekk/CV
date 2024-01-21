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
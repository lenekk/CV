import { Application, Container, Sprite, isMobile, Text} from "pixi.js";
import { copyToClipboard, writeMessage } from "./globalFunctions";

export const ContactMe = (app : Application) => {
    if(!app.stage.getChildByName("contact")){
        const contactContainer : Container = new Container();
        contactContainer.name = "contact"
        app.stage.addChild(contactContainer)
        const background : Sprite = Sprite.from("contact")
        contactContainer.addChild(background)
        let textOffsetY = -150
        
        contactContainer.pivot.set(contactContainer.width/2,contactContainer.height/2)
        contactContainer.position.set(app.screen.width/2,app.screen.height/2)
        if(isMobile.any){
            contactContainer.scale.set(.5, .5)
            textOffsetY = -300
        }else{
            contactContainer.scale.set(.8,.8)
        }

      
        const copyText = new Text("Skopiowano do schowka", {fontFamily : "font", fontSize: "20px", fill : "white"})
        copyText.name = "copyMessage"
        copyText.anchor.set(.5,.5)
        copyText.position.set(background.width/2, textOffsetY)
        

        const pageTitle : Text = new Text("Kontakt", {fontFamily: "font"})
        pageTitle.position.set(background.width/2, 100)
        pageTitle.anchor.set(.5,.5)

        const myPhoneNumberText : Text = new Text("", {fontFamily : "font", fontSize : "13px"})
        writeMessage("Numer telefonu: 531328180", myPhoneNumberText)
        myPhoneNumberText.position.set(background.width*.4, background.height*.4)
        myPhoneNumberText.anchor.set(.5,.5)
        const myPhoneEmailText : Text = new Text("", {fontFamily : "font", fontSize : "13px"})
        writeMessage("Email: dominiklenko@gmail.com", myPhoneEmailText)
        myPhoneEmailText.position.set(background.width*.4, background.height*.65)
        myPhoneEmailText.anchor.set(.5,.5)

        const copyPhoneNumber : Sprite = Sprite.from("copy")
        copyPhoneNumber.scale.set(.1,.1)
        copyPhoneNumber.anchor.set(.5,.5)
        copyPhoneNumber.position.set(background.width*.8, background.height*.4)
        copyPhoneNumber.eventMode = 'dynamic'
        copyPhoneNumber.on("pointerdown", () => {
            const copied = copyToClipboard("+48531328180")
            if(copied == true){
                if(!contactContainer.getChildByName("copyMessage")){
                    contactContainer.addChild(copyText)
                    setTimeout(() => {
                        contactContainer.removeChild(copyText)
                    },2000)
                }               
            }
        })
        copyPhoneNumber.on("mouseenter", () => {
            copyPhoneNumber.scale.set(.15, .15)
        })
        copyPhoneNumber.on("mouseleave", () => {
            copyPhoneNumber.scale.set(.1,.1)
        })
        background.addChild(copyPhoneNumber)
        
        
        const copyEmail : Sprite = Sprite.from("copy")
        copyEmail.scale.set(.1,.1)
        copyEmail.anchor.set(.5,.5)
        copyEmail.position.set(background.width*.8, background.height*.65)
        copyEmail.eventMode = 'dynamic'
        copyEmail.on("pointerdown", () => {
            const copied = copyToClipboard("dominiklenko@gmail.com")
            if(copied == true){
                if(!contactContainer.getChildByName("copyMessage")){
                    contactContainer.addChild(copyText)
                    setTimeout(() => {
                        contactContainer.removeChild(copyText)
                    },2000)
                }               
            }
        })
        copyEmail.on("mouseenter", () => {
            copyEmail.scale.set(.15, .15)
        })
        copyEmail.on("mouseleave", () => {
            copyEmail.scale.set(.1,.1)
        })
        background.addChild(copyEmail)
        background.addChild(pageTitle)
        background.addChild(myPhoneNumberText)
        background.addChild(myPhoneEmailText)

    }
}
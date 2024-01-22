import { Application, Container, Sprite, isMobile, Text} from "pixi.js";
import { copyToClipboard, writeMessage } from "./globalFunctions";

export const ContactMe = (app : Application) => {
    if(!app.stage.getChildByName("contact")){
        const contactContainer : Container = new Container();
        contactContainer.name = "contact"
        app.stage.addChild(contactContainer)
        const background : Sprite = Sprite.from("contact")
        contactContainer.addChild(background)
        
        contactContainer.pivot.set(contactContainer.width/2,contactContainer.height/2)
        contactContainer.position.set(app.screen.width/2,app.screen.height/2)
        if(isMobile.any){
            contactContainer.scale.set(.5, .5)
        }else{
            contactContainer.scale.set(1.5,1.5)
        }

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
            copyToClipboard("+48531328180")
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
            copyToClipboard("dominiklenko@gmail.com")
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
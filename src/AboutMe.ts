import { Application, Container, Sprite, Text, TextStyle, isMobile } from "pixi.js";

export const AboutMe = (app : Application) => {

    let sizeX;
    let sizeY;

    if(isMobile.any == true){
        sizeX = app.screen.width;
        sizeY = app.screen.height/2
    }else{
        sizeX = app.screen.width/2
        sizeY = app.screen.height
    }

    const titleStyle : TextStyle = new TextStyle({fontFamily: "font", fontWeight: "bold", fontSize: "40px"})
    const messageStyle : TextStyle = new TextStyle({fontFamily: "font", fontWeight: "bold", fontSize: "20px"})

    const pageContainer : Container = new Container();
    pageContainer.position.set(app.screen.width/2, app.screen.height/2)
    app.stage.addChild(pageContainer);
    const paper = Sprite.from('paper')
    paper.anchor.set(.5, .5)
    paper.width = sizeX
    paper.height = sizeY
    const textTitle = new Text("")
    textTitle.style = titleStyle
    textTitle.position.set(0, -350)
    textTitle.anchor.set(0.5,0.5)
    const aboutMeText = new Text("");
    aboutMeText.style = messageStyle;
    aboutMeText.anchor.set(.5,.5)
    pageContainer.addChild(paper)
    const phone = Sprite.from('phoneIcon')
    phone.scale.set(.2,.2)
    phone.position.set(-paper.width/4, paper.height/3)
    const mail = Sprite.from('mailIcon')
    mail.scale.set(.2,.2)
    mail.position.set(-paper.width/4, paper.height/3 - phone.height-10)
    pageContainer.addChild(phone)
    pageContainer.addChild(mail)
    paper.addChild(textTitle)
    paper.addChild(aboutMeText);

    writeMessage("About Me", textTitle);
    writeMessage("Mam na imię Dominik. Jestem świeżo\nupieczonym absolwentem informatyki\nwydziału Matematyki i Informatyki\nUniwersytetu Łódzkiego.\n\nAkutalnie poszukuję swojego pie-\nrwszego komercyjnego doświadczenia\nw branży IT. Swoją karierę pla-\nuję związać z szeroko pojętym web\ndevelopmentem, choć jestem otwarty\nna naukę innych gałęzi branży IT.", aboutMeText);
  
}

const writeMessage = (msg : string, textInstance : Text) => {
    
    let currentMessage = ""
    let i = 0;

    const writing =(i : number) => {
        currentMessage = msg.substring(0, i) 
        textInstance.text = currentMessage 
    }
    const interval = setInterval(() => {
        i++
        writing(i)
    }, 100)
    
    if(i == msg.length){
        clearInterval(interval);
    }
}
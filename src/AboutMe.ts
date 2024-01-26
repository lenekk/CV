import { Application, Container, Sprite, isMobile, Text, TextStyle} from "pixi.js";
import { writeMessage } from "./globalFunctions";

export const AboutMe = (app : Application) => {

    if(!app.stage.getChildByName("aboutMe")){
        const titleStyle : TextStyle = new TextStyle({fontFamily: "font", fontWeight: "bold", fontSize: "40px"})
        const messageStyle : TextStyle = new TextStyle({fontFamily: "font", fontWeight: "bold", fontSize: "20px"})
    
        let scaleValueX : number = .5;
        let scaleValueY : number = .5;
    
        let offsetX : number = 0;
        let offsetY : number = 0;
    
        if(isMobile.phone){
            scaleValueX = .28
            scaleValueY = .4
            offsetY = - app.screen.height/8
    
        }
    
        const pageContainer : Container = new Container();
        pageContainer.name = "aboutMe"
        pageContainer.position.set(app.screen.width/2, app.screen.height/2)
    
        const paper : Sprite = Sprite.from('paper')
        paper.position.set(offsetX, offsetY)
        paper.scale.set(scaleValueX,scaleValueY)
        paper.anchor.set(.5,.5)
    
        const textTitle : Text = new Text("")
        textTitle.style = titleStyle
        textTitle.anchor.set(.5, 10)
        writeMessage("About me", textTitle);
    
        const aboutText : Text = new Text("")
        aboutText.style = messageStyle
        aboutText.anchor.set(.5, .5)
        writeMessage(`Mam na imię Dominik. Jestem świeżo\nupieczonym absolwentem informatyki\nwydziału Matematyki i Informatyki\nUniwersytetu Łódzkiego.\n\nAkutalnie poszukuję swojego pie-\nrwszego komercyjnego doświadczenia\nw branży IT. Swoją karierę pla-\nuję związać z szeroko pojętym web\ndevelopmentem, choć jestem otwarty\nna naukę innych gałęzi branży IT.\n\nEdukacja:\n\n- ZSZ w Ozorkowie:\n  kierunek informatyka\n\n- Uniwersytet Łódzki\n  Wydział Matematyki i Informatyki\n\n  1) Lic. informatyka spec.grafika\n  komputerowa i projektowanie gier\n\n  2) Mgr. informatyka spec.inter-\n  aktywne media`, aboutText);
    
        app.stage.addChild(pageContainer);
        pageContainer.addChild(paper)
        paper.addChild(textTitle)
        paper.addChild(aboutText)
    }

}
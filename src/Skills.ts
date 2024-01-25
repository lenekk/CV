import { Application, Container, Sprite, Text, utils} from "pixi.js";

export const Skills = (app : Application) => {

    const skillPop = (where : Sprite, spritesArray : Array<Sprite>) => {
        let i = 0;
        
        const interval = setInterval(() => {
            where.addChild(spritesArray[i])
            i++
            if(i == spritesArray.length){
                clearInterval(interval);
            }
        },100)

    }

    if(!app.stage.getChildByName("skills")){
        const skillsContainer : Container = new Container()
        skillsContainer.name = "skills"
        app.stage.addChild(skillsContainer);
        
        const background : Sprite = Sprite.from('contact')
        skillsContainer.addChild(background)

        const title : Text = new Text("Tech Stack", {fontSize : "40px", fontFamily : "font"})
        title.anchor.set(.5,.5)
        title.position.set(background.width/2, 100)

        skillsContainer.pivot.set(skillsContainer.width/2,skillsContainer.height/2)
        skillsContainer.position.set(app.screen.width/2,app.screen.height/2)
        if(utils.isMobile.any){
            skillsContainer.scale.set(.5, .5)
        }else{
            skillsContainer.scale.set(1.5,1.5)
        }

        let xPosition : number = 75
        let yPosition : number = 175
        
        const javascript : Sprite = Sprite.from("javascript")
        const typescript : Sprite = Sprite.from("typescript")
        const react : Sprite = Sprite.from("react")
        const pixi : Sprite = Sprite.from("pixi")
        const html : Sprite = Sprite.from("html")
        const css : Sprite = Sprite.from("css")
        const git : Sprite = Sprite.from("git")
        const cpp : Sprite = Sprite.from("cpp")

        const iconsArray : Array<Sprite> = [javascript, typescript, react, pixi, html, css, git, cpp]

        for(let i=0; i<iconsArray.length; i++){
            iconsArray[i].scale.set(.7)
            if(i == 4){
                yPosition = 275
                xPosition = 75
            }
            iconsArray[i].position.x = xPosition
            iconsArray[i].position.y = yPosition
            xPosition += 135
        }

        skillPop(background, iconsArray)
        background.addChild(title)
    }

}
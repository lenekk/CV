import { AnimatedSprite, Application, Container, Sprite, utils, Assets, Ticker, isMobile, Text} from "pixi.js";
import {sound} from "@pixi/sound"
import { Keys, GamePad } from "./GamePad";
import { Collider } from "./Collider";
import { AboutMe } from "./AboutMe";
import { ContactMe } from "./ContactMe";
import { Skills } from "./Skills";
import { writeMessage } from "./globalFunctions";

type colliderPosition = {
    position : {
        x : number,
        y : number,
    },
    width : number,
    height : number
}

export const Main = (app : Application) => {

    
    sound.play("backgroundSound", {loop : true})
    
	if(isMobile.android.phone){
		
		//@ts-ignore
		window.screen.orientation['lock']("portrait-primary");
	}

    const mainContainer = new Container();
    const mainTicker = new Ticker()
    app.stage.addChild(mainContainer);

    const dialogBackground : Sprite = Sprite.from("tlo")
    dialogBackground.name = "dialog"
    dialogBackground.anchor.set(.5,.5)
    dialogBackground.position.set(app.screen.width/2, app.screen.height/8)
    dialogBackground.width = app.screen.width*.8
    dialogBackground.height = app.screen.height*.2
    const dialogText : Text = new Text("", {fontFamily : "font"})
    dialogText.anchor.set(1,1)
    dialogText.position.set(300, 50)
    writeMessage("Witaj!\n\nodwiedź każdego NPC,aby\nwyświetlić informacje!", dialogText)

    setTimeout(() => {
        mainContainer.removeChild(dialogBackground)
    }, 7000)

    const player : AnimatedSprite = new AnimatedSprite(Assets.get('mainCharacter').animations['down'])
    let playerMovSpeed : number = 1
    console.log(mainTicker.FPS);
    mainTicker.minFPS = 50
    const playerOffsetX = app.screen.width/2
    const playerOffsetY = app.screen.height/2 - player.height
    player.position.set(playerOffsetX, playerOffsetY);
    player.scale.set(3,3);
    player.animationSpeed = .2;
    const background = Sprite.from(Assets.get('mapa'))
    const backgroundOffsetX : number = player.position.x - 325
    const backgroundOffsetY : number = player.position.y - 500
    const backgroundMobileOffsetX : number = player.position.x - 225
    const backgroundMobileOffsetY : number = player.position.y - 400
    background.position.set(backgroundOffsetX, backgroundOffsetY)


    const npc1 : AnimatedSprite = new AnimatedSprite(Assets.get("npc1").animations['idle'])
    npc1.animationSpeed = .1
    npc1.scale.set(3,3)
    npc1.play();

    const bob : AnimatedSprite = new AnimatedSprite(Assets.get("bob").animations['idle'])
    bob.animationSpeed = .1
    bob.scale.set(3,3)
    bob.play();

    const amelia : AnimatedSprite = new AnimatedSprite(Assets.get("amelia").animations['idle'])
    amelia.animationSpeed = .1
    amelia.scale.set(3,3)
    amelia.play()

    const colliderArray = Assets.get("mapData").layers[4]
    const colliderMap = []
    const interactionMap = []
    const collisions : Array<Collider> = []
    const interactionArray = Assets.get("mapData").layers[5]
    const interactions : Array<Collider> = []

    for(let i=0; i<interactionArray.data.length; i+=interactionArray.width){
        interactionMap.push(interactionArray.data.slice(i, i+interactionArray.width))
    }
    
    for(let i=0; i<colliderArray.data.length; i += colliderArray.width){
        colliderMap.push(colliderArray.data.slice(i, i+colliderArray.width))
    }

    if(utils.isMobile.phone){
        interactionMap.forEach((row, index) => {
            row.forEach((value : number, indexX : number) => {
                if(value == 254){
                    interactions.push(new Collider({x: indexX * 48/1.3365 + backgroundMobileOffsetX, y: index * 48/1.3365 + backgroundMobileOffsetY}, 96/1.3365, 112/1.3365))
                }
            })
        })
    }else{
        interactionMap.forEach((row, index) => {
            row.forEach((value : number, indexX : number) => {
                if(value == 254){
                    interactions.push(new Collider({x: indexX * 48 + backgroundOffsetX, y: index * 48 + backgroundOffsetY}, 96, 96))
                }
            })
        })
    }


    if(utils.isMobile.phone){        

        colliderMap.forEach((row, index) => {
            row.forEach((value : number, indexX : number) => {
                if(value === 876){
                    collisions.push(new Collider({x: indexX * 48/1.3365 + backgroundMobileOffsetX, y: index * 48/1.3365 + backgroundMobileOffsetY}, 48/1.3365, 48/1.3365));
                }
            })
        });    
    }else{
        colliderMap.forEach((row, index) => {
            row.forEach((value : number, indexX : number) => {
                if(value === 876){
                    collisions.push(new Collider({x: indexX * 48 + backgroundOffsetX, y: index * 48 + backgroundOffsetY}, 48, 48));
                }
            })
        });
    }

    const colCon = new Container()
    app.stage.addChild(colCon)
    collisions.forEach(collider => {
        colCon.addChild(collider.add());
    })

    interactions.forEach(interact => {
        app.stage.addChild(interact.add())
    })

    npc1.position.set(interactions[0].position.x+22, interactions[0].position.y - 25)
    bob.position.set(interactions[1].position.x+22, interactions[1].position.y - 25)
    amelia.position.set(interactions[2].position.x+22, interactions[2].position.y - 25)
    

    mainContainer.addChild(background);
    mainContainer.addChild(player);
    mainContainer.addChild(npc1)
    mainContainer.addChild(bob)
    mainContainer.addChild(amelia)
    mainContainer.addChild(dialogBackground)
    dialogBackground.addChild(dialogText)

    const checkCollision = (col1: Sprite, col2 : colliderPosition) => {
        
        return(
            col1.position.x + col1.width >= col2.position.x &&
            col1.position.x <= col2.position.x + col2.width && 
            col1.position.y <= col2.position.y + col2.height - 20 && 
            col1.position.y + col1.height >= col2.position.y
        )
    
    }


    const aboutMeInteraction = (player : Sprite, interactionCollider : Collider) => {
        if(checkCollision(player, interactionCollider)){
        
            const toDelete = mainContainer.getChildByName("dialog")
            if(toDelete){
                mainContainer.removeChild(toDelete)
            }
            AboutMe(app)
        }else{
            const childToRemove = app.stage.getChildByName("aboutMe")
            if(childToRemove){
                app.stage.removeChild(childToRemove)
            }  
        }
    }

    const contactInteraction = (player : Sprite, interactionCollider : Collider) => {
        if(checkCollision(player, interactionCollider)){
            const toDelete = mainContainer.getChildByName("dialog")
            if(toDelete){
                mainContainer.removeChild(toDelete)
            }
            ContactMe(app)
        }else{
            const childToRemove = app.stage.getChildByName("contact")
            if(childToRemove){
                app.stage.removeChild(childToRemove)
            }  
        }
    }

    const skillsInteraction = (player : Sprite, interactionCollider : Collider) => {
        if(checkCollision(player, interactionCollider)){
            const toDelete = mainContainer.getChildByName("dialog")
            if(toDelete){
                mainContainer.removeChild(toDelete)
            }
            Skills(app)
        }else{
            const childToRemove = app.stage.getChildByName("skills")
            if(childToRemove){
                app.stage.removeChild(childToRemove)
            }  
        }
    }
    
    const keyHandlerUp = (event : KeyboardEvent) => {

        switch (event.key){
            case 'w':
                keys.w.isClicked = false;
                break;
            case 's':
                keys.s.isClicked = false;
                break;
            case 'a':
                keys.a.isClicked = false;
                break;
            case 'd':
                keys.d.isClicked = false;
        }
    }

    const keyHandlerDown = (event : KeyboardEvent) => {

        switch (event.key){
            case 'w':
                keys.w.isClicked = true;
                previousKey = 'w'
                break;
            case 's':
                keys.s.isClicked = true;
                previousKey = 's'
                break;
            case 'a':
                keys.a.isClicked = true;
                previousKey = 'a'
                break;
            case 'd':
                keys.d.isClicked = true;
                previousKey = 'd'
                break;
            default :
                break;
        }
    }

    const keys : Keys = {
        w : {
            isClicked: false
        },

        s : {
            isClicked: false
        },

        a : {
            isClicked: false
        },

        d : {
            isClicked: false
        }

    }

    if(utils.isMobile.phone){

        window.removeEventListener('keydown', keyHandlerDown)
        window.removeEventListener('keyup', keyHandlerUp)
        
        background.scale.set(.75,.75)
        background.position.set(backgroundMobileOffsetX,backgroundMobileOffsetY)

        const gamePad = new GamePad(app);
        gamePad.add(keys)
/*
        if(document.fullscreenEnabled){
            gamePad.fullScreenVersion()
        }
*/
        document.body.addEventListener("fullscreenchange", () => {
            gamePad.fullScreenVersion()
        })

    }

    let previousKey = ''
    let collisionEnter : boolean = false;
    
    mainTicker.add(() => {

        collisionEnter = false

        aboutMeInteraction(player, interactions[0])
        contactInteraction(player, interactions[1])
        skillsInteraction(player, interactions[2])

        if(keys.w.isClicked){

            for(let i=0; i<collisions.length; i++){
                
                if(checkCollision(player, {...collisions[i], position: {x: collisions[i].position.x, y: collisions[i].position.y+playerMovSpeed}}))
                {
                    collisionEnter = true;
                    break;
                }
                if(checkCollision(player, {position: {x : npc1.position.x, y: npc1.position.y + playerMovSpeed}, width : npc1.width, height: npc1.height}) || checkCollision(player, {position: {x : bob.position.x, y: bob.position.y + playerMovSpeed}, width : bob.width, height: bob.height}) || checkCollision(player, {position: {x : amelia.position.x, y: amelia.position.y + playerMovSpeed}, width : amelia.width, height: amelia.height})){
                    collisionEnter = true;
                    break;
                }
                
            }

            if(collisionEnter == false){
                if(player.playing == false){
                    player.play();
                }
                
                if(player.textures != Assets.get('mainCharacter').animations['up']){
                    player.textures = Assets.get('mainCharacter').animations['up']
                    player.play();
                }
    
                background.position.y += playerMovSpeed
                npc1.position.y += playerMovSpeed
                bob.position.y += playerMovSpeed
                amelia.position.y += playerMovSpeed
                collisions.forEach(collider => {
                    collider.move("y+")
                })

                interactions.forEach(interact => {
                    interact.move("y+")
                })
            }

            
            
        }

        else if(keys.s.isClicked){

            for(let i=0; i<collisions.length; i++){
                
                if(checkCollision(player, {...collisions[i], position: {x: collisions[i].position.x, y: collisions[i].position.y-playerMovSpeed}}))
                {
                    collisionEnter = true;
                    break;
                }

                if(checkCollision(player, {position: {x : npc1.position.x, y: npc1.position.y - playerMovSpeed}, width : npc1.width, height: npc1.height}) || checkCollision(player, {position: {x : bob.position.x, y: bob.position.y - playerMovSpeed}, width : bob.width, height: bob.height}) || checkCollision(player, {position: {x : amelia.position.x, y: amelia.position.y - playerMovSpeed}, width : amelia.width, height: amelia.height})){
                    collisionEnter = true;
                    break;
                }
                
            }
            
            if(collisionEnter == false){
                if(player.playing == false){
                    player.play();
                }
    
                if(player.textures != Assets.get('mainCharacter').animations['down']){
                    player.textures = Assets.get('mainCharacter').animations['down']
                    player.play();
                }
                
                background.position.y -= playerMovSpeed
                npc1.position.y -= playerMovSpeed
                bob.position.y -= playerMovSpeed
                amelia.position.y -= playerMovSpeed
                collisions.forEach(collider => {
                    collider.move("y-")
                })
                interactions.forEach(interact => {
                    interact.move("y-")
                })
            }
            
        }

        else if(keys.a.isClicked){

            for(let i=0; i<collisions.length; i++){
                
                if(checkCollision(player, {...collisions[i], position: {x: collisions[i].position.x+playerMovSpeed, y: collisions[i].position.y}}))
                {
                    collisionEnter = true;
                    
                    break;
                }

                if(checkCollision(player, {position: {x : npc1.position.x + playerMovSpeed, y: npc1.position.y}, width : npc1.width, height: npc1.height}) || checkCollision(player, {position: {x : bob.position.x + playerMovSpeed, y: bob.position.y}, width : bob.width, height: bob.height}) || checkCollision(player, {position: {x : amelia.position.x + playerMovSpeed, y: amelia.position.y}, width : amelia.width, height: amelia.height})){
                    collisionEnter = true;
                    break;
                }
                
            }

            if(collisionEnter == false){
                if(player.playing == false){
                    player.play();
                }
    
                if(player.textures != Assets.get('mainCharacter').animations['left']){
                    player.textures = Assets.get('mainCharacter').animations['left']
                    player.play();
                }
    
                background.position.x += playerMovSpeed
                bob.position.x += playerMovSpeed
                npc1.position.x += playerMovSpeed
                amelia.position.x += playerMovSpeed
                collisions.forEach(collider => {
                    collider.move("x+")
                })
                interactions.forEach(interact => {
                    interact.move("x+")
                })
            }

            
            
        }

        else if(keys.d.isClicked){

            for(let i=0; i<collisions.length; i++){
                
                if(checkCollision(player, {...collisions[i], position: {x: collisions[i].position.x -playerMovSpeed, y: collisions[i].position.y}}))
                {
                    collisionEnter = true;
                    
                    break;
                }

                if(checkCollision(player, {position: {x : npc1.position.x - playerMovSpeed, y: npc1.position.y}, width : npc1.width, height: npc1.height}) || checkCollision(player, {position: {x : bob.position.x - playerMovSpeed, y: bob.position.y}, width : bob.width, height: bob.height}) || checkCollision(player, {position: {x : amelia.position.x - playerMovSpeed, y: amelia.position.y}, width : amelia.width, height: amelia.height})){
                    collisionEnter = true;
                    break;
                }
                
            }

            if(collisionEnter == false){
                if(player.playing == false){
                    player.play();
                }
                
                if(player.textures != Assets.get('mainCharacter').animations['right']){
                    player.textures = Assets.get('mainCharacter').animations['right']
                    player.play();
                }
    
                background.position.x -= playerMovSpeed
                npc1.position.x -= playerMovSpeed
                bob.position.x -= playerMovSpeed
                amelia.position.x -= playerMovSpeed
                collisions.forEach(collider => {
                    collider.move("x-")
                })
                interactions.forEach(interact => {
                    interact.move("x-")
                })
            }

            
            
        }else{
            player.stop();
            player.currentFrame = 0;
        }
    })

    mainTicker.start();
    console.log(previousKey);

    window.addEventListener('keydown', keyHandlerDown);
    window.addEventListener('keyup', keyHandlerUp);

}
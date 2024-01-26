import { AnimatedSprite, Application, Container, Sprite, utils, Assets, Ticker, isMobile} from "pixi.js";
import {sound} from "@pixi/sound"
import { Keys, GamePad } from "./GamePad";
import { Collider } from "./Collider";
import { AboutMe } from "./AboutMe";
import { ContactMe } from "./ContactMe";
import { Skills } from "./Skills";

type colliderPosition = {
    position : {
        x : number,
        y : number,
    },
    width : number,
    height : number
}

export const Main = (app : Application) => {

    sound.play('backgroundSound')
    
	if(isMobile.android.phone){
		
		//@ts-ignore
		window.screen.orientation['lock']("portrait-primary");
	}

    const mainContainer = new Container();
    app.stage.addChild(mainContainer);

    const player = new AnimatedSprite(Assets.get('mainCharacter').animations['down'])
    const playerOffsetX = app.screen.width/2
    const playerOffsetY = app.screen.height/2 - player.height
    player.position.set(playerOffsetX, playerOffsetY);
    player.scale.set(3,3);
    player.animationSpeed = .2;
    const background = Sprite.from(Assets.get('mapa'))
    background.position.set(400,100)

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
                    interactions.push(new Collider({x: indexX * 48/1.3365 - 98, y: index * 48/1.3365}, 96/1.3365, 96/1.3365))
                }
            })
        })
    }else{
        interactionMap.forEach((row, index) => {
            row.forEach((value : number, indexX : number) => {
                if(value == 254){
                    interactions.push(new Collider({x: indexX * 48 + 400, y: index * 48 + 100}, 96, 96))
                }
            })
        })
    }


    if(utils.isMobile.phone){        

        colliderMap.forEach((row, index) => {
            row.forEach((value : number, indexX : number) => {
                if(value === 876){
                    collisions.push(new Collider({x: indexX * 48/1.3365 - 98, y: index * 48/1.3365}, 48/1.3365, 48/1.3365));
                }
            })
        });    
    }else{
        colliderMap.forEach((row, index) => {
            row.forEach((value : number, indexX : number) => {
                if(value === 876){
                    collisions.push(new Collider({x: indexX * 48 + 400, y: index * 48 + 100}, 48, 48));
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

    mainContainer.addChild(background);
    mainContainer.addChild(player);

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
        background.position.set(-100,0)

        const gamePad = new GamePad(app);
        gamePad.add(keys)

    }

    let previousKey = ''
    let collisionEnter : boolean = false;

    console.log(interactions);

    Ticker.shared.add(() => {

        collisionEnter = false

        aboutMeInteraction(player, interactions[0])
        contactInteraction(player, interactions[1])
        skillsInteraction(player, interactions[2])

        if(keys.w.isClicked){

            for(let i=0; i<collisions.length; i++){
                
                if(checkCollision(player, {...collisions[i], position: {x: collisions[i].position.x, y: collisions[i].position.y+2}}))
                {
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
    
                background.position.y += 1
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
                
                if(checkCollision(player, {...collisions[i], position: {x: collisions[i].position.x, y: collisions[i].position.y-2}}))
                {
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
                
                background.position.y -= 1
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
                
                if(checkCollision(player, {...collisions[i], position: {x: collisions[i].position.x+2, y: collisions[i].position.y}}))
                {
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
    
                background.position.x += 1
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
                
                if(checkCollision(player, {...collisions[i], position: {x: collisions[i].position.x -2, y: collisions[i].position.y}}))
                {
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
    
                background.position.x -= 1
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

    console.log(previousKey);

    window.addEventListener('keydown', keyHandlerDown);
    window.addEventListener('keyup', keyHandlerUp);

}
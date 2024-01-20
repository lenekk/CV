import { AnimatedSprite, Application, Container, Sprite, utils, Assets, Ticker} from "pixi.js";
import { Keys, GamePad } from "./GamePad";
import { Collider } from "./Collider";
import { AboutMe } from "./AboutMe";

export const Main = (app : Application) => {


    const mainContainer = new Container();
    app.stage.addChild(mainContainer);

    const player = new AnimatedSprite(Assets.get('mainCharacter').animations['down'])
    const playerOffsetX = app.screen.width/2
    const playerOffsetY = app.screen.height/2 - player.height
    player.position.set(playerOffsetX, playerOffsetY);
    player.scale.set(3,3);
    player.animationSpeed = .2;
    //player.play();
    const background = Sprite.from(Assets.get('mapa'))

    const colliderArray = Assets.get("mapData").layers[4]
    const colliderMap = []
    const collisions : Array<Collider> = []
    
    for(let i=0; i<colliderArray.data.length; i += colliderArray.width){
        colliderMap.push(colliderArray.data.slice(i, i+colliderArray.width))
    }


    if(utils.isMobile.phone){        

        colliderMap.forEach((row, index) => {
            row.forEach((value : number, indexX : number) => {
                if(value === 876){
                    collisions.push(new Collider({x: indexX * 48/1.3365 - 198, y: index * 48/1.3365}, 48/1.3365, 48/1.3365));
                }
            })
        });    
    }else{
        colliderMap.forEach((row, index) => {
            row.forEach((value : number, indexX : number) => {
                if(value === 876){
                    collisions.push(new Collider({x: indexX * 48, y: index * 48}, 48, 48));
                }
            })
        });
    }

    const colCon = new Container()
    app.stage.addChild(colCon)
    collisions.forEach(collider => {
        colCon.addChild(collider.add());
    })

    mainContainer.addChild(background);
    mainContainer.addChild(player);
    AboutMe(app);

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
        background.position.set(-200,0)

        const gamePad = new GamePad(app);
        gamePad.add(keys)

    }

    let previousKey = ''

    Ticker.shared.add(() => {

        if(keys.w.isClicked){

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
            
        }

        else if(keys.s.isClicked){

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
        }

        else if(keys.a.isClicked){

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
            
        }

        else if(keys.d.isClicked){

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
            
        }else{
            player.stop();
            player.currentFrame = 0;
        }
    })

    console.log(previousKey);

    window.addEventListener('keydown', keyHandlerDown);
    window.addEventListener('keyup', keyHandlerUp);

}
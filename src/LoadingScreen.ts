import { Application, Assets, Container, Graphics, Ticker, Text, isMobile} from "pixi.js";
import { manifest } from "./Assets";
import { Main } from "./Main";

export const LoadingScreen = (app : Application) => {

    const loadingScreenContainer : Container = new Container();

    const playText = new Text("Let's try!")

    const titleText = new Text("My Resume")

    titleText.anchor.set(.5,.5)
    
    titleText.position.y -= 150

    playText.position.set(-130,-12);
    let loadingProgress = 0;
    app.stage.addChild(loadingScreenContainer);
    loadingScreenContainer.position.set(app.screen.width/2, app.screen.height/2)
    loadingScreenContainer.addChild(titleText)

    const backgroundBorder = new Graphics();
    backgroundBorder.lineStyle(5, [0,0,0], 1);
    backgroundBorder.drawRect(-150,-25,300, 50);
    const background = new Graphics();
    background.beginFill(0x808080);
    background.drawRect(-150,-25,300,50)

    const rectange = new Graphics();
    rectange.beginFill([255,0,0]);
    rectange.drawRoundedRect(0,0,30,30,8);
    rectange.endFill();
    loadingScreenContainer.addChild(rectange)
    const rectange2 = new Graphics();
    rectange2.beginFill([0,0,255]);
    rectange2.drawRoundedRect(0,0,30,30,8);
    rectange2.endFill();
    rectange2.angle = 180
    loadingScreenContainer.addChild(rectange2)
    const rectange3 = new Graphics();
    rectange3.beginFill([0,255,0]);
    rectange3.drawRoundedRect(0,0,30,30,8);
    rectange3.endFill();
    rectange3.angle = 90
    loadingScreenContainer.addChild(rectange3)
    const rectange4 = new Graphics();
    rectange4.beginFill([130,0,200]);
    rectange4.drawRoundedRect(0,0,30,30,8);
    rectange4.endFill();
    rectange4.angle = 270
    loadingScreenContainer.addChild(rectange4)

    const loadingTicker = new Ticker;
    let ticks = 0;
    loadingTicker.add(() => {

        ticks++
        
        if(loadingProgress == 1){
            rectange.destroy()
            rectange2.destroy()
            rectange3.destroy()
            rectange4.destroy()
            loadingScreenContainer.addChild(background)
            loadingScreenContainer.addChild(backgroundBorder)
            loadingScreenContainer.addChild(playText);
            loadingTicker.stop()
        }else{
            //rectange.angle = 45;
            //rectange2.angle = -45;
            //rectange3.angle = 135;
            //rectange4.angle = - 

            rectange.position.x += Math.cos(ticks) * 30 ; 
            rectange.position.y += Math.cos(ticks) * 30 ;

            rectange2.position.x -= Math.cos(ticks) * 30
            rectange2.position.y -= Math.cos(ticks) * 30

            rectange3.position.x -= Math.cos(ticks) * 30
            rectange3.position.y += Math.cos(ticks) * 30

            rectange4.position.x += Math.cos(ticks) * 30
            rectange4.position.y -= Math.cos(ticks) * 30
            
        }
    })

    loadingTicker.start();

    const progress = (currentProgress : number) => {
       loadingProgress = currentProgress;
    }

    const loadManifest = async () => {
        Assets.init({manifest : manifest});
        await Assets.load('font.ttf');
        await Assets.loadBundle("images", progress.bind(this));
    }

    const gameLoaded = () => {
        titleText.style =  {
            fontFamily: "font",
            fill: "white"
        }
        playText.style = {
            fontFamily: "font",
            fill: "white"
        }
        
        playText.eventMode = "dynamic"

        playText.on('pointerdown', () => {
            // full screen not supported on ios
            if(isMobile.android.phone){
                document.body.requestFullscreen().then(() => {
                    loadingScreenContainer.destroy();
                    Main(app)
                }).catch(() => {
                    console.log("Full Screen mode rejected");
                })
            }else{
                loadingScreenContainer.destroy()
                Main(app)
            }
        })
    }

    loadManifest().then(() => {
        gameLoaded();
    });

}
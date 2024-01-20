import { Application, Graphics, Text, TextStyle} from "pixi.js"

export type Keys = {
    w : {
        isClicked: boolean
    },

    s : {
        isClicked: boolean
    },

    a : {
        isClicked: boolean
    },

    d : {
        isClicked: boolean
    }
}

export class GamePad {

    app : Application
    constructor(app : Application){
        this.app = app;
    }

    add(keys : Keys){

        const buttonStyle = new TextStyle({
            fontFamily : "font",
            fill : "white"
        })
        
        const wText = new Text("W", buttonStyle);
        const sText = new Text("S", buttonStyle);
        const aText = new Text("A", buttonStyle);
        const dText = new Text("D", buttonStyle);

        wText.anchor.set(.4,.5)
        sText.anchor.set(.4,.5)
        dText.anchor.set(.4,.5)
        aText.anchor.set(.4,.5)

        let size = this.app.screen.width / 15
        
        const positionA = {
            x : 2 * size,
            y : this.app.screen.height - this.app.screen.height/7
        }
        const positionD = {
            x : 5* size,
            y : this.app.screen.height - this.app.screen.height/7
        }
        const positionW = {
            x : 3.5 * size,
            y : this.app.screen.height - this.app.screen.height/4.5
        }
        const positionS = {
            x : 3.5 * size,
            y : this.app.screen.height  - this.app.screen.height/15
        }

        const btnUp = new Graphics()
        btnUp.beginFill([1,1,1,.5])
        btnUp.drawCircle(positionW.x, positionW.y, size)
        btnUp.endFill();
        wText.position.set(positionW.x,positionW.y)
        btnUp.eventMode = 'dynamic'
        btnUp.on('pointerdown', () => {
            keys.w.isClicked = true;
        })
        btnUp.on('pointerup', () => {
            keys.w.isClicked = false;
        })

        const btnDown = new Graphics()
        btnDown.beginFill([1,1,1,.5])
        btnDown.drawCircle(positionS.x, positionS.y, size)
        btnDown.endFill();
        sText.position.set(positionS.x,positionS.y)
        btnDown.eventMode = 'dynamic'
        btnDown.on('pointerdown', () => {
            keys.s.isClicked = true;
        })
        btnDown.on('pointerup', () => {
            keys.s.isClicked = false;
        })

        const btnLeft = new Graphics()
        btnLeft.beginFill([1,1,1,.5])
        btnLeft.drawCircle(positionA.x, positionA.y, size)
        btnLeft.endFill();
        aText.position.set(positionA.x,positionA.y)
        btnLeft.eventMode = 'dynamic'
        btnLeft.on('pointerdown', () => {
            keys.a.isClicked = true;
        })
        btnLeft.on('pointerup', () => {
            keys.a.isClicked = false;
        })

        
        const btnRight = new Graphics()
        btnRight.beginFill([1,1,1,.5])
        btnRight.drawCircle(positionD.x, positionD.y, size)
        btnRight.endFill();
        dText.position.set(positionD.x,positionD.y)
        btnRight.eventMode = 'dynamic'
        btnRight.on('pointerdown', () => {
            keys.d.isClicked = true;
        })
        btnRight.on('pointerup', () => {
            keys.d.isClicked = false;
        })

        this.app.stage.addChild(btnUp)
        this.app.stage.addChild(btnDown)
        this.app.stage.addChild(btnLeft)
        this.app.stage.addChild(btnRight)
        this.app.stage.addChild(dText)
        this.app.stage.addChild(aText)
        this.app.stage.addChild(wText)
        this.app.stage.addChild(sText)
    }

}
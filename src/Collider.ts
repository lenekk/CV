import { Container, Graphics } from "pixi.js";

export class Collider {
    position: {x: number, y:number};
	width: number;
	height: number;
	rect: Graphics;
    container: Container
	constructor(pos: {x: number, y: number}, width: number, height: number) {
		this.position = pos;
		this.width = width;
		this.height = height;
        this.container = new Container()
		this.rect = new Graphics();
	}

	add(){
		this.rect.beginFill([0, 1, 0, 1]);
		this.rect.drawRect(this.position.x, this.position.y, this.width, this.height);
		this.rect.endFill();
		this.container.addChild(this.rect);
        return this.container
	}

	move(value: string): void{
		if(value === 'y+'){
			this.rect.position.y += 1;
			this.position.y += 1;
		}
		else if(value === 'y-'){
			this.rect.position.y -= 1;
			this.position.y -=1;
		}
		else if(value === 'x-'){
			this.rect.position.x -= 1;
			this.position.x -=1;
		}
		else if(value === 'x+'){
			this.rect.position.x += 1;
			this.position.x +=1;
		};
		
	}

}
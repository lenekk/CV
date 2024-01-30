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
		this.rect.beginFill([0, 1, 0, 0]);
		this.rect.drawRect(this.position.x, this.position.y, this.width, this.height);
		this.rect.endFill();
		this.container.addChild(this.rect);
        return this.container
	}

	move(value: string, speed : number): void{
		if(value === 'y+'){
			this.rect.position.y += speed;
			this.position.y += speed;
		}
		else if(value === 'y-'){
			this.rect.position.y -= speed;
			this.position.y -=speed;
		}
		else if(value === 'x-'){
			this.rect.position.x -= speed;
			this.position.x -=speed;
		}
		else if(value === 'x+'){
			this.rect.position.x += speed;
			this.position.x +=speed;
		};
		
	}

}
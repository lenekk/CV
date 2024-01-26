import { Application, isMobile} from 'pixi.js'
import { LoadingScreen } from './LoadingScreen';

if(isMobile.any === false){
	window.innerHeight = window.innerHeight * .95
	window.innerWidth = window.innerHeight * .95
}

console.log(window.screen.orientation);


const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: devicePixelRatio || 1,
	backgroundColor: 0x010F32,
	autoDensity: true,
	width: window.innerWidth,
    height: window.innerHeight,
	resizeTo: window,
});

(globalThis as any).__PIXI_APP__ = app;

LoadingScreen(app);
import { Application, isMobile} from 'pixi.js'
import { LoadingScreen } from './LoadingScreen';

if(isMobile.any === false){
	window.innerHeight = window.innerHeight*.75
	window.innerWidth = window.innerWidth*.75
}

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: devicePixelRatio || 1,
	backgroundColor: 0x201611,
	autoDensity: true,
	width: window.innerWidth,
    height: window.innerHeight,
	resizeTo: window,
});

(globalThis as any).__PIXI_APP__ = app;

LoadingScreen(app);
import type { ResolverManifest } from "pixi.js";

export const manifest:ResolverManifest = {
    bundles : [
        {
            name : "images",
            assets : {
                "mainCharacter" : "alex.json",
                "mapa" : "mapav3.png",
                "mapData" : "mapa.json",
                "paper" : "papirus.png",
                "phoneIcon" : "telefon.png",
                "mailIcon" : "mail.png",
            }
        }
    ]
}
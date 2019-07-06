// add p5 instanced 
import p5 = require("p5");
import * as p5Sound from "p5/lib/addons/p5.sound";
import * as p5Dom from "p5/lib/addons/p5.dom";

export = p5;
export as namespace p5;
declare global {
    interface Window {
        p5: typeof p5,
    }
}

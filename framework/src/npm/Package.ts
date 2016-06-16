import * as fs from "fs";

export class Package {

    public name: string;
    public version: string;
    public description: string;
    public main: string;

    constructor(folder: string) {
        var pkg = require(folder + "/package.json");
        Object.keys(pkg).forEach((propName: string) => {
            (<any>this)[propName] = pkg[propName];
        })
    }

}
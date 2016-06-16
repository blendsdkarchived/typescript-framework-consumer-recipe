import * as DemoFramework from "demo-framework";

console.log("Framework Version is: " + DemoFramework.VERSION);
console.log("Framework Package is:");
console.log(DemoFramework.getCurrentPackage());

var appPackage = new DemoFramework.npm.Package(__dirname + "/../");
console.log("App Package is:");
console.log(appPackage);

var app = new DemoFramework.System.Application();
app.println("Hello World");

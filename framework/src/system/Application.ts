export class Application {   // maybe the export keyword is not needed here

    run(): void {

    }

    print(message: string) {
        process.stdout.write(message);
    }

    println(message: string) {
        var me = this;
        me.print(message + "\r\n");
    }

}

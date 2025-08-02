export default class CommandHandler {
    constructor() {
        this.commands ={
            help: this.help,
            greet: this.greet,
            date: this.date,
            clear: this.clear,
            disco: this.disco
        }
    }


    execute(command, args) {
        if (this.commands[command]) {
            return this.commands[command](args);
        } else {
            return `Unknown command: ${command}`;
        }
    }

    help() {
        return 'Available commands: help, greet, date, clear, disco';
    }

    greet() {
        return 'Hello, user!';
    }

    date() {
        return new Date().toString();
    }

    clear() {
        return { clear: true };
    }

    disco(){
        return { disco: true};
    }
}
class Greeter {
    defaultMessage = 'Hello';

    greet(greeting, object) {
        return `${greeting}, ${object}`;
    }
}

export default Greeter;
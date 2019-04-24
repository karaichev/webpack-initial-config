import $ from 'jquery';
import Greeter from './greeter';
import '../sass/style.sass';
import logo from '../img/sun.png';


const greeter = new Greeter();
const message = greeter.greet('Hello', 'World');

const app = document.getElementById('app');

const h1 = document.createElement('h1');
h1.textContent = message;
h1.className = 'title';

const img = document.createElement('img');
img.src = logo;

app.appendChild(h1);
app.appendChild(img);

$('#message').text(message);
// console.log(message);
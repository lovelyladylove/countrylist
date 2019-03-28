// This refers in this case to the to the window object
// The window object is the browser window itself
console.log(window);

// The document represents your "HTML" structure
console.log(document);

console.log(heading);
console.log(heading.style);
heading.style.color = 'white';
heading.style.backgroundColor = 'green';

heading.innerHTML = 'Country List';

// ---
const addParagraph = () => {
	// Create an element
	let ourElement = document.createElement('p');
	console.log('OUR NEW ELEMENT: ', ourElement);
	// Add some text to it
	ourElement.innerText = 'THIS IS THE TEXT';
	console.log('OUR NEW ELEMENT: ', ourElement);
	// Display it in the document after the heading
	heading.insertAdjacentElement('afterend', ourElement);
};

// ---
// Event listener
// ---
let ourButton = document.getElementById('button');
console.log(ourButton);
ourButton.addEventListener('click', addParagraph);

// TODO
// ---

let todo = [
	{ name: 'Germany', id: 0, done: false },
	{ name: 'Philippines', id: 1, done: false },
	{ name: 'USA', id: 2, done: false }
];

const finishToDoItem = () => {
	// Get all <span> elements that are inside the ul#todolist
	let todoItems = document.querySelectorAll('#todolist li span, #donelist li span');

	// Go over all <span>
	todoItems.forEach((item) => {
		// Add an event listener for each item
		item.addEventListener('click', (event) => {
			let id = event.target.attributes[0].value;

			todo[id].done = !todo[id].done;
			// Do something when the item is clicked
			// event.target.style.textDecoration = "line-through"
			renderToDoList();
		});
	});
};

const editToDoItem = () => {
	let buttons = document.querySelectorAll('button');

	buttons.forEach((button) =>
		button.addEventListener('click', (event) => {
			let id = event.target.attributes[0].value;
			let parentListItem = event.target.closest('li');
			let span = parentListItem.querySelector('span');
			span.innerHTML = `<input type="text" value="${todo[id].name}">`;
			let input = parentListItem.querySelector('input');
			input.focus();

			input.addEventListener('keyup', (event) => {
				if (event.code == 'Enter') {
					todo[id].name = input.value;
					span.innerHTML = todo[id].name;
				}
			});
		})
	);
};

const renderToDoList = () => {
	let htmlToDo = '';
	let htmlDone = '';
	todo.forEach((item) => {
		if (item.done == false) {
			htmlToDo += `
      <li>
        <span data-id="${item.id}">${item.name}</span> 
        <button data-id="${item.id}">Edit</button>
      </li>`;
		} else {
			htmlDone += `
      <li>
        <span data-id="${item.id}">${item.name}</span> 
        <button data-id="${item.id}">Edit</button>
      </li>
      `;
		}
	});
	document.getElementById('todolist').innerHTML = htmlToDo;
	document.getElementById('donelist').innerHTML = htmlDone;

	finishToDoItem();
	editToDoItem();
};

renderToDoList();
editToDoItem();

// If I write a new to do in the input
document.getElementById('todoInput').addEventListener('keydown', (event) => {
	if (event.code == 'Enter') {
		// I will add it to the list
		todo.push({
			name: document.getElementById('todoInput').value,
			id: todo.length,
			done: false
		});

		// The list will update
		renderToDoList();

		// Reset the input
		document.getElementById('todoInput').value = '';
	}
});

let countryAPI = 'http://www.worldometers.info/world-population/population-by-country/';
let studentsData = [];

let studentsListElement = document.querySelector('#country-list');

students.forEach((student) => {
	fetch(countryAPI + student)
		// Wait for the response
		.then((response) => response.json()) // Turn the response into JSON
		.then((json) => {
			console.log(json); // Output the JSON to the console so we can see it
			studentsData.push(json);
			console.log(studentsData);

			if (json.avatar_url !== undefined) {
			}
			studentsListElement.innerHTML += `
      <div class="col-4">
        <div class="card" >
          <img class="card-img-top" src=${json.avatar_url ||
				'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12225358/Pug-On-White-01.jpg'} alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${json.login}</h5>
            <p class="card-text">${json.location || 'NOT ON THIS PLANET'}</p>
            <a target="_blank" href="${json.html_url}" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      `;
		});
});

// (window,document,'script','//www.google-analytics.com/analytics.js','ga');

/*
const container = document.querySelector('#container');

fetch('http://www.worldometers.info/world-population/population-by-country/')
  .then(res => res.json())
  .then((json) => {
    json.forEach((match) => {
      console.log(match);
      let code2_home = [...match.home_team.code].splice(0, 2).join("")
      let code2_away = [...match.away_team.code].splice(0, 2).join("")
      container.innerHTML += `
        <div>
          <img src="https://www.countryflags.io/${code2_away}/flat/64.png" />
          <h2>${match.home_team.country} (${match.home_team.code}) - ${match.away_team.country} ( ${match.away_team.code})</h2>
          <h3>${match.home_team.goals} - ${match.away_team.goals}</h3>
        </div>
      `
    });
  });
*/

let add = document.forms[0];
let ul = document.querySelector("ul");

//Handles the submit event: takes the value of the input
//field and puts it in the local storage. later on updates
//the dom with a copy of the text in form of a list
add.addEventListener("submit", (e) => {
  let task = add["item"].value;
  if (task) {
    let li = document.createElement("li");
    let lastIndex;
    let bg = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)},${(0.5 + Math.random() * 0.4).toFixed(
      2
    )})`;
    let x = document.createElement("i");
    let tasks;

    if (localStorage.key("tasks")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      lastIndex = tasks.length;
    } else {
      tasks = [];
      lastIndex = 0;
    }

    tasks.push({ task, bg, index: lastIndex });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.innerText = task;
    li.style.backgroundColor = bg;
    x.innerText = "x";
    x.className = "delete";
    li.setAttribute("key", lastIndex);

    li.appendChild(x);
    ul.appendChild(li);
    add.reset();
    deleteItem(li);
  }
  e.preventDefault();
});

// loads the previous content from the localStorage to the DOM when the browser reloads
window.addEventListener("load", () => {
  let items = JSON.parse(localStorage.getItem("tasks"));
  items.forEach((el) => {
    let li = document.createElement("li");
    let x = document.createElement("i");

    li.innerText = el.task;
    li.style.backgroundColor = el.bg;
    li.setAttribute("key", el.index);
    x.innerText = "x";
    x.className = "delete";
    li.appendChild(x);
    ul.appendChild(li);
    deleteItem(li);
  });
});

//delete function. handles the delete of the item
let deleteItem = (li) => {
  li.addEventListener("click", (e) => {
    if (e.target.className === "delete") {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks = tasks.filter(
        (el) => el.index !== Number(e.target.parentNode.getAttribute("key"))
      );
      localStorage.setItem("tasks", JSON.stringify(tasks));
      e.target.parentNode.remove();
    }
    e.preventDefault();
  });
};

//Filter Tasks
document.getElementById("filterInput").addEventListener("keyup", (e) => {
  let ul = document.querySelector('ul'),
      li = ul.children;
  for(let i = 0; i<ul.childElementCount; i++){
    li[i].textContent.toLowerCase().indexOf(String(e.target.value).toLowerCase()) === -1? li[i].style.display = 'none': li[i].style.display = 'flex'
  }
});

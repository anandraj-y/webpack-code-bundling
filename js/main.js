const $input = document.querySelector('#todoInput');
const $button = document.querySelector('#addTodo');
const $list = document.querySelector('.list');
let todoList = [];
const Init = () => {
    const savedItem = localStorage.getItem('todoList');
    // $list.innerHTML = savedItem;
    if(savedItem) {
        const parseTodoList = JSON.parse(savedItem);
        todoList = [...parseTodoList];
        todoList.forEach(todo => {
             appendTodo(todo)
        })
    }
}

addTodo = () => {
    if(validateInput()) return
    const todoObj = {
        text: $input.value,
        completed: false,
        id: todoList.length
    }
    appendTodo(todoObj)
    todoList.push({...todoObj});
    localStorage.setItem('todoList', JSON.stringify(todoList));
    $input.value = "";
}
const appendTodo = (todoItem) =>  {
    const node = document.createElement('LI');
    // const attr = document.createAttribute('type');
    // attr.value = '1';
    // node.setAttributeNode(attr);
    const textNode =  document.createTextNode(todoItem.text);   
    node.appendChild(textNode);
    $list.appendChild(node);
    const buttonNode = document.createElement('BUTTON');
    const buttonTextNode =  document.createTextNode(`Todo ${todoItem.id}`);
    buttonNode.appendChild(buttonTextNode);
    $list.appendChild(buttonNode);
}

const createButton = (todoItem, type) => {
    const buttonNode = document.createElement(type);
    const buttonTextNode =  document.createTextNode(`Todo ${todoItem.id}`);
    buttonNode.appendChild(buttonTextNode);
    $list.appendChild(buttonNode);
}

const keyPressed = (event) => {
    if (!event) return false;
    if (event.keyCode === 13) return true
    return false;
}

const validateInput = () => {
    if($input.value === "") return true;
    return false
}
$button.addEventListener('click', addTodo);
$input.addEventListener('keydown', (event)=>{
    if(keyPressed(event)) {
        addTodo()
    }
})
$button.addEventListener('keydown', (event)=>{
    if(keyPressed(event)) {
        addTodo()
    }
})
Init();
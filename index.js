const todoContainer = document.getElementById('todoList')
const addList = document.getElementById('addBtn')
const saveList = document.getElementById('saveBtn')

let todoList = []

saveList.onclick = function()
{
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

 let storedItem = () =>
{
    let stringified = localStorage.getItem('todoList')
    let parsed = JSON.parse(stringified)

    if(parsed === null) // empty array 
    {
        return []
    }
    else{
        return parsed
    }
}

todoList = storedItem()  // todolist assigning as well as calling the function

function onStatusChange(labelId, todoId)
{
    let label = document.getElementById(labelId)
    label.classList.toggle('checked')

    let indexing = todoList.findIndex(each => {
        let eachId = 'todo' + each.uniqueId 
        let result = todoId === eachId ? true : false;
        return result
    })

let todoObject = todoList[indexing]
if (todoObject.isChacked === true)
{
    todoObject.isChacked = false
}
else{
    todoObject.isChacked = true
}
}



function ondeleteingList(todoID)
{
    const list = document.getElementById(todoID)
    todoContainer.removeChild(list);
  
    let findingIndex = todoList.findIndex(each => {
         let eachId = 'todo' + each.uniqueId;
         let result = eachId === todoID ?  true :  false;
         return result
    })
console.log(findingIndex)

if(findingIndex !==-1)
{
    todoList.splice(findingIndex, 1)
}
}

addList.onclick = function()
{
    const User = document.getElementById('userInput')
    let content = User.value;
    let newtodo = {
        text: content,
        uniqueId : todoList.length +1,
        isChacked: false
    }

if(User.value==="")
{
    alert('Enter the valid todo');
    return;
}

  todoList.push(newtodo)
  createAndAppendTodo(newtodo)

  User.value=""
}




//dynamic list
function createAndAppendTodo(todo)
{
  let checkboxId = 'checkbox' + todo.uniqueId;
  let labelId = 'label' + todo.uniqueId
  let todoId = 'todo' + todo.uniqueId;

const listofElement = document.createElement('li')
listofElement.classList.add('list-items')
listofElement.id = todoId
todoContainer.appendChild(listofElement)

const listContainer= document.createElement('div')
listofElement.appendChild(listContainer)

const inputfiled = document.createElement('input')
inputfiled.type= 'checkbox'
inputfiled.id = checkboxId;
inputfiled.checked = todo.isChacked
inputfiled.onclick = function()
{
    onStatusChange(labelId, todoId)
}

listContainer.appendChild(inputfiled)

const labelElement = document.createElement('label')
labelElement.setAttribute('for', checkboxId);
labelElement.textContent = todo.text
labelElement.id = labelId
labelElement.classList.add('label')
listContainer.appendChild(labelElement)

if(todo.isChacked === true)
{
    labelElement.classList.add('checked')
}

const deleteIcon = document.createElement('i')
deleteIcon.classList.add('bi', 'bi-trash')
deleteIcon.onclick = function()
{
    ondeleteingList(todoId)
}
listofElement.appendChild(deleteIcon)

console.log(todoContainer)
}


todoList.map(each => {
    createAndAppendTodo(each) // call the function
})
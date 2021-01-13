//tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners(){//amaç tüm eventlistener ları atamak
form.addEventListener("submit",addTodo); //sumbit olduğunda todo ekle
document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
secondCardBody.addEventListener("click",deleteTodo);//secondcardbody e bastığımda deleteTodo çalışsın silme işlemi
filter.addEventListener("keyup",filterTodos);
clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e){
if(confirm("tümünü silmek istediğinizden emin misiniz?")){
//arayüzden todoları temizleme
//todoList.innerHTML = ""; //her şeyi siler ama yavaş yöntemdir
while(todoList.firstElementChild !=null){   //hepsi için tek tek yapacağımıza while içinde 1 tane yazdık
    todoList.removeChild(todoList.firstElementChild);
}

localStorage.removeItem("todos"); //storage den siliyoruz

}



}

function filterTodos(e){
const filterValue=e.target.value.toLowerCase();//küçük harfe çevirdk
const listItems=document.querySelectorAll(".list-group-item");//tüm listıtemları yani li leri çekmemiz alzım

listItems.forEach(function(listItem){  //listItemların üzernde gezineceğiz
const text = listItem.textContent.toLowerCase();
if(text.indexOf(filterValue) === -1){//bulamadı

    listItem.setAttribute("style","display : none !important");//bunu sayfada gösterme

}
else{
    listItem.setAttribute("style","display : block");//sayfada göster
}

});

}


function deleteTodo(e){ //arayüzden sildik 

if(e.target.className ==="fa fa-remove"){
    e.target.parentElement.parentElement.remove();
     deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("succes","Todo başarıyla silindi..");
}

}

function deleteTodoFromStorage(deletetodo){//storageden silme
let todos = getTodosFromStorage();

todos.forEach(function(todo,index){
    if(todo === deletetodo)
    {
        todos.splice(index,1);//arrayden değer silebiliriz
   
    }
});
localStorage.setItem("todos",JSON.stringify(todos));

}

function loadAllTodosToUI(){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo){
addTodoToUI(todo);

    })
}

function addTodo(e){//buraya bir tane event objesi gidecek

const newTodo = todoInput.value.trim(); //inputtaki değerleri almam gerekiyor.aldığım değeri newtodo şeklinde değişkene atadık.

if(newTodo === "") //newTodo boş ise 
{
showAlert("danger","lütfen bir Todo girin...!!!"); //alert adı,gönderilecek mesaj
}
else  //değilse ekleme yapılacak
{
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    
    showAlert("success","Todo başarıyla eklendi...");
}





e.preventDefault(); //tekrar sayfaya yönlenmesin 
}
function getTodosFromStorage(){ //storage den bütün todoları almış olacak
    let todos;
    if(localStorage.getItem("todos") === null){
todos = [];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
     }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
     localStorage.setItem("todos",JSON.stringify(todos));

     
    }




function showAlert(type,message){
const alert =document.createElement("div");

alert.classname = ` alert alert-${type}`;

alert.textContent=message;

firstCardBody.appendChild(alert);


setTimeout(function(){ // mesajım 1sn sonra kaybolacak
alert.remove();
},1000);

}

function addTodoToUI(newTodo)//arayüze bu değeri ekleyecek
{ 
    
    /*<!-- <li class="list-group-item d-flex justify-content-between">
Todo 1
<a href = "#" class ="delete-item">
    <i class = "fa fa-remove"></i>
</a>

</li>-->*/


//listıtem oluşturma
const listItem = document.createElement("li");

//link oluşturma
const link = document.createElement("a");
link.href="#";
link.className="delete-item";
link.innerHTML="<i class = 'fa fa-remove'></i>";

listItem.className="list-group-item d-flex justify-content-between";

//text node ekleme
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);

//todo liste list ıtemi ekleme



todoList.appendChild(listItem);
//todoInput.value=""; //yazdıklarımızı temizliyor



}


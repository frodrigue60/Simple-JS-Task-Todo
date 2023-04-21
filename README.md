# Simple JS Task To-do app

This is a simple to-do javascript application, using HTML5, CSS3, and Vanilla Javascript
*Note: The information is only stored in the execution variables, there is no data persistence*

![Example image of the app](https://github.com/frodrigue60/Simple-JS-Task-Todo/blob/master/todo.png?raw=true)

### In the app you can:
 - Create
 - edit
 - update
 - delete
 
 the tasks, in addition to being able to mark them as finished.

### how does it work?
The way it works is simple, the tasks are saved in two different arrangements, depending on their status (active or inactive). Utilizando el metodo **push()**.

For deletion, the javascript **find()** method is used to locate the element in the array, then the **filter()** method is used to return a new array excluding the deleted task.

When a completed task is marked, the aforementioned methods are used in the same way, except that the object (task) instead of only being eliminated, is sent to another method where it will become part of the completed tasks array and at reverse

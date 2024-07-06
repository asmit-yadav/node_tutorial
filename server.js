// console.log("server file is running")
// function add(a, b) {
//     return a + b;
// }
// var add=function(a,b)
// {
//     return a+b;
// }
// console.log(typeof add)
// var add=(a,b)=>
// {
//     return a+b;
// }
// console.log(typeof add)
// var add=(a,b)=> a+b;
// var result = add(2, 81);
// console.log(result)


// function callback()
// {
//     console.log('asmit is calling callback function');
// }
// const add=function(a,b,callback)
// {
//     var result =a+b;
//     console.log('result =>'+result);
//     callback();
// }
// add(2,9,callback);
// const add=function(a,b,callback)
// {
//     var result =a+b;
//     console.log('result =>'+result);
//     callback();
// }
// add(3,2,()=> { console.log('add comleted')})


// var fs=require('fs');
// var os =require('os')
// var user=os.userInfo()
// console.log(user.username)
// fs.appendFile('greeting.txt','Hi '+user.username+'!\n',()=>
// {
//     console.log('File is created');
// })
// console.log(os)

// const notes=require('./notes.js');

// console.log(notes.age)
// var a=notes.add(10,90);
// console.log(a)
var _ = require('lodash');
var data = ["person", 'person', 1, 2, 3, 1, 2, 'name', 'age', '2'];
var filter = _.uniq(data)
console.log(filter)

### 名词解释
#### 闭包
有权访问另一个函数作用中的变量的函数（注意闭包是一个函数）
> 闭包的作用：封装私有变量
```
  function foo(){
    var a = 1;
    function bar(){
      console.log(a++);
    }
    return bar;
  }
  var bar = foo();
  bar(); //2
  bar();;//3
```
> a变量只能在调用bar()函数时改变
```
function createPerson(name){
  var privateName = name;
  return{
    //创建一个getter方法来获取私有变量
    getter:functon(){
      return privateName
    }
  }
}
person = createPerson("haha")
console.log(person.name) //undefine
console.log(person.getter()) //haha
```
> person对象的name属性，只能被getter（）方法调用，不能直接调用，这就是所谓的私有变量。
#### 构造函数
```
var obj = new Object();//这种原生定义好的构造函数，叫做原生构造函数
var add = new Function('a','a','return a + b');

// instanceof 语句的意思是判断obj是否为Object构造函数的一个实例
console.log(obj instanceof Object); //true
console.log(add instanceof Function); // true

//声明构造函数
function Bottle(name,price,isKeepWarn){
  this.name = name;
  this.price = price;
  this.isKeepWarn = isKeepWarn;
}
var bottle = new Bottle('杯子',59,true);
console.log(bottle instanceof Bottle); //true
```
new 语句后面函数叫做构造函数，业界规定构造函数首字母应该大写
构造函数的特点:1.没有显式的创建对象。2.将属性和方法赋值给this。3.没有`return`语句。
> new操作符都干了什么？？
> new操作符会创建一个对象，并把构造函数中的this指向这个创建的对象，并将这个对象返回出来。
> 这个返回出来的新对象就叫做构造函数的实例。
#### 原型



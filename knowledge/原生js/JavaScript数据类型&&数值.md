#### 1.JavaScript中的数据结构
  - 数值(number):整数和小数(比如1和3.14)
  - 字符串(string):字符组成的文本(比如"Hello World")
  - 布尔值(boolean):`true`(真)和`false`(假)两个特定值
  - `undefined`:表示"未定义"或者不存在,即由于目前没有定义,所以此处暂时没有任何值
  - `null`:表示无值,即此处的值就是无的状态
  - 对象(object):各种值组成的集合
    - 狭义对象(object)
    - 数组(array)
    - 函数(function)
#### 2.typeof
```
typeof 123 //"number"
typeof '123' //"string"
typeof false //"boolean"
function f(){}
typeof f //"function"
typeof underfined //"undefined"
typeof window //"object"
typeof {} //"object"
typeof [] //"object"
typeof null //"object"
```
#### NaN
###### NAN是JavaScript的特殊值，表示"非数字"(Not a Number),主要出现在将字符串解析成数字出错的场合。
###### NaN不能与任何值相等包括它自己
```
NaN === NaN //false
```
###### isNaN方法可以用来判断一个值是否为`NaN`
```
isNaN(NaN) //true
isNaN(123) //false
```


# ReactDemo
### 1.深入JSX
#### 本质上讲，JSX只是为`React.createElement(component,props,...children)`方法提供的语法糖。比如一下代码：
```
<MyButton color='blue' shadowSize={2}>
  Click Me
<MyButton>
```
###### 编译为：
```
React.createElement(
  MyButton,
  { color:'blue',shadowSize:2},
  'Click Me'
)
```
#### 如果没有子代，你还可以使用自闭标签，比如：
```
<div className="sidebar" />
```
###### 编译为：
```
React.creactElement(
	'div',
	{className:'siderbar'},
	null
)
```
>从以上代码可以看出，jsx写起来虽然感觉是HTML，其实实质上更偏向于js。
### 2.指定React元素类型
#### JSX的标签名决定了React元素的类型
#### 大写开头的JSX标签表示一个React组件。这些标签将会被编译为同名变量并被引用，所以如果你使用了`<Foo />`表达式，则必须在作用域中先声明`Foo`变量。
#### 1.React必须声明
#### 由于JSX编译后会调用React.createElement方法，所以在你的JSX代码中必须首先声明`React`变量，如：
```
import React from 'react';
import CustomButton from './CustomBUtton'
const WarningButton = () =>{
	//返回 Ract.createElement(CustomButton,{color:'red'},null);
	return <CustomButton color='red' />
}
```
#### 2.点表示法
###### 实例代码如下：
```
import React from 'react'
const MyComponents = {
	DatePicker = (props) =>( return <div>Imagine a {props.color} datepicker</div> )
}
const BlueDatePicker = () =>( <MyComponent.DatePicker color='blue' /> )
```
#### 3.首字母大写
###### 实例代码如下：
```
import React from 'react'
//错误！组件的名应该大写：
const hello = (peops) => ( 
	//正确！div 是有效的HTML标签：
	<div>Hello {props.toWhat}</div>
)
const HelloWorld = () =>(
	//错误！React会将小写开头的标签认为是HTML原生标签：
	<hello toWhat='World' />
)
```
> 为解决这个问题，我们将`hello`重命名`Hello`,然后使用`<Hello />`引用
#### 4.在运行时选择类型
###### 实例代码如下：
```
import React from 'react'
import { PhotoStory, VideoStory } from './stories'

const components = {
	photo: PhotoStory,
	video: VideoStory
}

const Story = (props) =>(
	//错误！JSX标签名不能为一个表达式
	<components[props.storyType] story={props.story} />
)

const Story = (props) =>{
	//正确！JSX标签名可以为大写开头的变量
  const SpecificStory = components[props.storyType]
	return( <SpecificStory story={props.story} />)
}
```
### 3.属性
###### 在jSX中有几种不同的方式来指定属性
#### 1.使用JavaScript表达式
###### 如：
```
<MyComponent fpp={ 1 + 2 + 3 + 4 }/>

const NumberDescriber = (props) =>{
	let description
	if( props.number % 2 == 0){
		description = <strong>even</strong>
	}else{
		description = <i>odd</i>
	}
	return <div>{props.number} is an {description}</div>
}
```
#### 2.字符串常量
```
<MyComponent message="hello world" />
<MyComponent message={"hello world"} />
```
#### 3.默认为True
>如果你没有给属性传值，它默认为`true`。因此下面两个JSX是等价的：
```
<MyTextBox autocomplete />
<MyTextBox autocomplete={ true } />
```
#### 4.扩展属性
###### 代码如下
const App = () =>{
	const props = {firstName:'Ben',lastName:'Hector'}
	return ( <Greeting {...props} /> ) 
}

### 4.子代
>在包含开始和结束标签的JSX表达式中，标记之间的内容作为特殊的参数传递：`props.children`。有几种不同的方法来传递子代：
#### 1.字符串常量
```
<MyComponent>Hello world!</MyComponent>
```
#### 2.JSX
```
<MyContainer>
	<div>hello</div>
	<MyFirstComponent />
</MyContainer>
```
>你可以通过子代嵌入不同类型的组件。
```
render(){
	//可以不使用额外的元素包裹数组中的元素
	return [
		<li>First item</li>
		<li>Secend item</li>
		<li>Third item</li>
	]
}
```
#### 3.JavaScript表达式
##### 你可以将任何`{}`包裹的JavaScript表达式作为子代传递。
###### 实例代码如下
```
const Item = (props) =>( <li>{props.message}</li>)
cosnt TodoList = () =>{
	const todos = ['finish doc','submit pr','nag dan to review']
	return(
		<ul>
			{todos.map((message =><Item key={message} message={message}/>))}
		</ul>
		)
}
```
#### 4.函数
###### 实例代码如下
```
const Repeat = (props) =>{
	let items = []
	for(let i = 0;i < props.numTimes;i++){
		//props.children是一个函数
		items.push(props.children(i))
	}
	return <div>{item}</div>
}
const ListOfTenThings = () =>{
	return(
		<Repeat numTimes={10}>
			//在子代中传入函数，可在`<Repeat>`组件中调用
			{ (index) => <div key={index}>This is item {index} in the list</div> }
		</Repeat>
		)
}
```
>在子代中传入js函数，这个用法并不常见，但当你想扩展JSX时可以使用。
#### 5.布尔值、Null、和Undefinded被忽略
###### `false`、`null`、`undefined`、`true`都是有效的子代，但它们不会直接被渲染。下面表达式时等价的：
```
<div />
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>
```
###### 这在根据条件来确定是否渲染React元素时非常有用，代码如下：
```
<div>
	//当showHeader = true时，<Header/>可被渲染
	{showHeader && <Header />}
</div>
```
###### 	`JavaScript`中的一些“falsy”(比如数字0)值不会被渲染`
```
<div>
	//当messages为空数组时，只会打印`0`
	{props.messages.length && <MessageList messages={props.messages}>}
</div>
<div>
	//当messages不为空数组时，<MessageList />组件就可打印
	{ props.messages.length > 0 && <MessageList messages={props.messages}> }
</div>
```
###### 相反，如果你想让类似`false`、`true`、`null`或`undefined`出现在输出中，你必须先把它转换成字符串：
```
<div>
	My JavaScript variable is {String(myVariable)}
</div>
```

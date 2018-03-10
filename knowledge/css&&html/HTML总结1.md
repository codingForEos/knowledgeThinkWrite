## HTML认识
```
<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```
- `<!DOCTYPE html> `的含义为文档声明（不属于HTML元素），声明此HTML为HTML5语法，作用是告诉浏览器使用哪个HTML版本进行解析，如果不进行文档声明或者错误的文档声明，有可能导致浏览器错误的识别HTML的版本，导致页面显示不正确，同理HTML4也有文档声明，和这个不一样。
- 元素是HTML基本概念。
- `<HTML></HTML>`元素叫做顶级元素或者根元素，`<HTML>`元素只能包含`<head></head>`和`<body></body>`元素，网页中其他的所有元素均包含在`<head></head>`或`<body></body>`元素之中。
- 页面的通用信息都包含在`<head></head>`元素中，通用信息又叫做元数据。元数据的含义即描述HTML页面本身的信息，比如`<title></title>`
- 页面的内容都写在`<body></body>`元素中，
### 深入了解head元素
> `<head>`元素用于定义网页的常规信息和元数据，虽然在网页中不可见，但是非常重要，
> 总的来说，`<head>`元素内的子元素大概分为三类，分别是：1、描述网页基本信息的，指向渲染网页需要其他文件链接的，各大厂商根据自己需要定制的。
#### 网页基本信息
一个网页，首先得有个标题，就跟人有名字一样。除此之外，还可以根据实际需要补充一些基本信息。
- 文档标题（浏览器标签中显示的文本）：`<title>深入理解head元素</title>`
- 编码格式：`<meta charset="utf-8">`(你可能还看到过`gb2312`格式，不过不建议使用)，如果你的页面出现乱码，那一般就是编码问题
- 视窗设置：`<meta name="viewport" content="width=divice-width,initital-scale=1.0">`
- 搜索引擎优化相关内容：`<meta name="description" content="帮助你深层次了解HTML文档结构">`
- IE浏览器版本渲染设置：`<meta http-equiv="X-UA-Compatible" content="ie=edge">`
#### 其他文件链接
一个完整的网页光有HTML结构是非常丑陋的，就如一个毛坯房。有了结构之后，我们还需要加入样式与行为为网页增加色彩。
- CSS文件：`<Link rel="stylesheet" type="text/css" href="style.css">`
- JavaScript文件：`<script src="script.js"></script>`
### 厂家定制
比喻开启双核浏览器先河的360浏览器就定制了一个默认使用哪个内核来渲染页面，可以设置为webkit内核、IE标准，IE兼容三种模式。代码分别为：
```
<meta name="renderer" content="webkit"> <!-- 默认webkit内核 -->
```
```
<meta name="renderer" content="ie-stand"> <!-- 默认IE标准模式 -->
```
```
<meta name="renderer" content="ie-comp"> <!-- 默认IE兼容模式 -->
```
#### 注释
html注释格式`<!-- ... -->`
```
<!-- 标题，请勿更改 -->
<h1>我是h1标题</h1>

<!-- todos:这段代码需要优化一下 -->
<div class="">...</div>

<!-- 由于版本升级，下面这段内容暂时不用 -->
<!-- <p>我是一段暂时不用的内容</p> -->
```

#### 属性
HTML元素的属性值应该被双引号包裹！
```
<a href="index.html" title="首页"></a>  //属性书写形式：属性名=“属性值”
<input type="text" disabled> //disabled是布尔值属性（属性的值不是true就是false）
```
#####属性的分类
全局属性：每个元素都会有的属性。
四大全局属性：class id title style

#### HTML常见元素
标题元素：<h1>这是标题 1</h1> <h2>这是标题 2</h2> <h3>这是标题 3</h3> <h4>这是标题 4</h4> <h5>这是标题 5</h5> <h6>这是标题 6</h6>
段落元素：<p>这个一个段落</p>
图片元素：<img src="imweb-logo.png" alt="IMWeb 学院" width="184" height="43">
链接元素(anchor)：<a href="http://imweb.io" target="_blank"></a>
有序列表元素(order list):
```
<ol>
    <li>首先把冰箱门打开</li>
    <li>然后把大象关</li>
    <li>最后把冰箱门关上</li>
</ol>
```
> 注意！<ol>元素内部只能放<li>元素
无序列表(unorder list):
```
<ul>
    <li></li>
    <li></li>
</ul>
```
> 注意！<ul>元素内部只能放<li>元素
块元素：<div></div>
不知道怎么放的都放<div>里，!用于包裹块级元素

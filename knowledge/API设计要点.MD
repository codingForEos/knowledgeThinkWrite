### API设计要点
#### 1-1. 正确拼写
举例：

| 中文大意 | 期望 | 
|---------|:----:|
| 表单    | form | 
| 报名    | sign-up |
| 采纳 | adopt |
| 内容 | content |
| 测试 | test |
| 联系 | contact |
| 高度 | height |
| 宽度 | width |
| 移动 | mobile |
| 标签 | tab |

#### 1-2. 注意单复数
所有涉及遍历，操作对象，数组，集合的函数，建议采用复数。
> 对于展现复数，不同公司有不同的习惯，但是得统一，比如产品列表-`productsList`。这里用了list表示复数，再其他地方，就不建议使用`products`这种方式表示复数了

#### 1-3. 用词准确
两方面
##### 1-3-1. 单词意思不准确
比如弹窗上面的信息，有些时候见到，使用包含`notice`的字样，但是实际上，`notice`的中文意思，准确的应该是'公告、告示、声明'之类的。
一个弹窗这样的会话消息，建议使用`message`这样的字样。`notice`应该像'公告、告示、声明'之类的情况使用。
##### 2-3-2. 正反词义单词错用
比如关闭弹窗的方法是`closeDialog`，显示弹窗应该是`openDialog`。`show`的意思是'显示',反义词应该是`hide`。
附常用反义词组（有些带缩写）

| prev | next |
|----|:----:|
| in | out |
| on | off |
| show | hide |
| close | open |
| success |  fail |
| before | after |
| begin | end |

#### 1-4. 命名意义
错误示例
```
//版本1
function handle1(){
}
function handle2(){
}
//版本2
function handleA(){
}
function handleB(){
}
//版本3
function handleOne(){
}
function handleTwo(){
}

```
正确姿势
```
function handleHome(){
}
function handleCollect(){
}

```

#### 1-5. 命名格式
文章说的API，主要针对的是函数，但是在这一小块里面，也列举一下其它的目标的建议命名方式。

| 待命名对象 | 推荐名称 |
|-----------|:--------:|
| 图片 | '-' '\_' 分割 |
| class,id | '\_' 分割 |
| 文件，变量 | 驼峰命名 |
| 临时变量 |'\_'开头，驼峰命名 |



#### 1-6. 处理中文拼音
对于中文拼音，应该说只有一种情况，被中国人创造出来，没有英文翻译的

| 命名 | 含义 |
|------|:----:|
| taobao | 淘宝 |
| weibo | 微博 |
| zongzi | 粽子 |
| pingyin | 拼音 |

#### 1-7. 命名潜规则
有些情况，要给特定的对象命名，还要用特定的名字，可以说是潜规则吧

| 待命名对象 | 推荐名称 |
|-----------|:--------:|
| 按钮 | btn |
| 背景 | bg |
| 模板 | tpl |
| 提示信息 | msg |
| 标签栏 | tab |
| 网站大图（广告宣传图） | banner |
| 注册 | register |

#### 2. 参数
对于函数而言，参数是用户设置最频繁，也是最关心的部分，合理设计函数参数，这一步很重要，直接影响函数的使用。

#### 2-1. const入参
这个应该说是一种习惯吧，不要直接改变入参的值。这个规则的初衷是解决函数的副作用问题。如果参数是一个引用类型的数据，如果在函数内部修改了参数，到时候将会使得原本的数据发生改变，往往会发生难以追踪的问题。

#### 2-2. 控制参数数量
参数的数量超过3个，使用对象进行封装。因为如果API参数越多，那么使用这个API的记忆成本就越大，易用性也很受影响。
使用对象记录参数，用户只需要记住参数作用及名称就好了。
```
encryptStr: function (obj){
  var _default = {
    type:0,
    replacement:'*'
  };
  for(var key in obj){
    _default[key] = obj[key];
  }
}
//调用
ecDo.encryptStr({str:'1881e323rwef',regArr:[5],type:0,replacement:'-'});
```
#### 2-3. 前置相关性高的参数
> 必填重要的参数前置，可省略的参数后置。

#### 3. 作用
#### 3-1. 支持批量处理
比如这个例子，页面有这样的元素
```
<div class="div1"></div>
<div class="div2"></div>
<div id="div2"></div>
```
有一个类似JQuery的css的API
```
css：function(dom,json){
  for(var attr in json){
    dom.style[attr] = json[attr];
  }
}
```
然后给这些div设置样式的时候，代码如下
```
var oDiv1 = document.querySelectorAll(".div1");
var oDiv2 = document.querySelector("#div1");
ecDo.css(oDiv2,{'height':'100px','width':'100px','background':'#333'});
ecDo.css(oDiv1,{'height':'100px','width':'100px','background':'#09f'});
```
当运行到`ecDo.css(oDiv1,{'height':'100px','width':'100px','background':'#09f'});`会提示报错，原因大家也知道。css这个API里面，只处理了单个元素，并没有处理元素的集合。

建议的方式是把css这个API改成可批量处理元素集合。
```
css: function(dom,json){
  if(dom.length){
    for(var i = 0;i < dom.length;i++){
      for(var attr in json){
        dom[i].style[attr] = json[attr];
      }
    }
  }else{
    for(var attr in json){
      dom.style[attr] = json[attr];
    }
  }
},
```

#### 3-2. 多态处理
一个类似JQuery中html的API。
之前遇到一个开发者的处理方式是：获取元素的innerHTML和设置元素innerHTML分开为两个方法getHtml，setHtml。这样增加了记忆的成本，建议的姿势就是，获取和设置用同一个API。
```
html：function(dom){
  if(arguments.length === 1){
    return dom.innerHTML;
  }else if(arguments.length === 2){
    dom.innerHTML = arguments[1];
  }
}

ecDo.html(oDiv);//获取
ecDo.html(oDiv,'守候'); //设置
```
#### 3-3. 可扩展性
可扩展性，就是建议遵守开发-封闭原则。对扩展开放，对修改关闭，比如jQuery的$.fn和$.fn.extend()。
说y一个简单的例子-计算加薪额度
```
var addMoney = (function(){
  //定义策略类
  var strategies = {
    A:function(money){
      return money + 2000;
    },
    B:function(money){
      return money + 1000;
    }
  }
  //暴露接口
  return {
    //根据等级和现工资，输入加薪前的工资，返回加薪后的工资
    compute:function(lv,money){
      return strategies[lv](money);
    }
  };
})();

//比如：等级为A，5000+2000
console.log(addMoney('A',5000)) //7000
//比如：等级为B，20000+1000
console.log(addMoney('B',20000)) //21000

```
代码看着没问题，但是如果以后需求要增加C等级呢？就得修改strategies。在里面增加方法。
如下
```
var strategies = {
    A:function(money){
        return money + 2000;
    },
    B:function(money){
        return money + 1000;
    },
    C:function(money){
        return money + 500;
    }
};

```
这样实现也简单，如果以后要增加S等级呢？又得改`strategies`。这里还有一个问题就是，如果增加的C等级只有在A模块需要用到，在B模块不会用到，那么在B模块引用addMoney的时候引入进去，造成不必要的资源浪费。
建议的方式是，设置一个接口。扩展strategies。

```
var addMoney = (function(){
  let strategies = {
    A:function(money){
      return money + 2000;
    },
    B:function(money){
      return money + 1000;
    }
  };
  //暴露接口
  return {
    compute:function(lv,money){
      return strategies[lv](money);
    },
    //扩展等级
    addRule:function(lv,fn){
      strategies[lv] = fn;
    }
  }
})();
//增加C等级的调用
addMoney.addRule('C',function(money){
  return money + 500;
  });
console.log(addMoney.compute('C',20000)) // 20500
```
#### 3-4. 避免副作用
函数的副作用，相信很多人都会遇到，比如在一个函数体内修改一个外部作用域的变量，或者全局变量，在函数体内修改引用类型的参数，这些情况多少都会遇到过。
如何避免呢？主要是以下两个写代码习惯。
1. 函数体内可以使用参数，进行操作，但是不能修改。如果修改，用一个临时变量记录参数（如果是引用类型，需要用深拷贝记录）。这样可以避免直接修改参数。
2. 对于函数外的变量，如全局变量。函数体内可以访问，但是不能修改。
3. 如果需要给函数外的变量赋值，不能再函数体内操作，把值返回到外部，再外部进行赋值。

```
//不好的做法
var myName = '';
function setName(firstName,lastName){
  myName = firstName + lastName;
}
setName('守','候');

//推荐做法
var myName = '';
function setName(firstName,lastName){
  return = firstName + lastName;
}
myName = setName('守','候');
```
#### 4. 向下兼容
这个建议主要就是为了兼顾以前的写法。
```
//原来的传参方式
encryptStr: function(str,regArr,type,replacement){};
//升级后
encryptStr: function(obj){};
```
这个问题就来了，一个项目里面，因为历史的原因难免会使用这个API，并且使用了第一种方式传参。现在API改了，解决的方案有两个:第一、把整个项目使用的这个API改成升级后的API。第二、对接口进行向下兼容，兼容以前的方案。
```
encryptStr: function(obj){
  var _default = {
    type:0,
    replacement:'*'
  };
  //如果还是以之前的方式调用函数，兼容性判断
  if(arguments.length > 1){
    _default.str = arguments[0];
    _default.regArr = arguments[1];
    _default.type = arguments[2] || 0;
    _default.replacement = arguments[3] || '*';
  }else{
    for(var key in obj){
      _default[key] = obj[key];
    }
  }
  //下面代码略
}
```








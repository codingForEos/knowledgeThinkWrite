/**
 * Model 模型
 * Model 的作用是封装了一个应用的核心的数据，并提供了一些方法，用来操作这些核心数据。
*/
function Model(){
    var val =0;
    //添加数量
    this.add = function(v){
        if(val < 100){
            val +=  v;
            console.log(`当前val${val}`);
        }
    }
    //减少数量
    this.sub = function(v){
        if(val > 0){
            val -= v;
            console.log(`当前val${val}`);
        }
    }
    //获取数据
    this.getVal = function(){
        return val;
    }
    /**
     * 观察者模式
    */
    var self = this,
        views = [];
    //观察者注册方法
    this.register = function(view){
        views.push(view);
        console.log(views);
    }
    //对观察者的广播函数
    this.notify = function(){
        for(var i=0,len=views.length;i<len;i++){
            views[i].render(self);
        }
    }
}
/**
 * View 视图
*/
function View(controller){
    //当点击发生的时候，view需要调用controlor的方法
    var calculator = document.querySelector('.wrap');
    var client = document.querySelector('.client');
    var addBtn = document.querySelector('.increase');
    var subBtn = document.querySelector('.decrease');
    this.render = function(modle){ 
        console.log('render了');
        client.innerHTML = `${modle.getVal()}元`;
    }
    /* 绑定事件 */
    addBtn.onclick = controller.increase;
    subBtn.onclick = controller.decrease;
}

/**
 * Controller 控制器
*/
function Controller(){
    var modle = null,
        view = null;
    this.init = function(){
        modle = new Model();
        view = new View(this);

        /* view注册观察者 */
        modle.register(view);
        modle.notify();
    };
    this.increase = function(){
        console.log('加1');
        modle.add(1);
        modle.notify();
    }
    this.decrease = function(){
        console.log('减一');
        modle.sub(1);
        modle.notify();
    }
}

var controller = new Controller();
controller.init();

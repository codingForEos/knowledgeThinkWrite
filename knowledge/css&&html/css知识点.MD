## css知识点
### css注释
```
/* 这是一行单行注释 */
/* 这个注释分散
   在多个行上面*/
```
#### 注释功能分类：
1. 辅助阅读注释
```
/* logo 样式 */
.logo{
  width:200px;
}
```
2. 单行代码注释
```
/*logo 样式*/
.logo{
/* width:200px */
}
```
3. 多行代码注释
```
/* logo 样式 */
.logo{
  width:200px;
  /* height: 100px;
    position: relative;
    left: 10px;
    top: 40px;
  */
}
```

### css引入HTML的方式
```
 1. 行内方式
<div style="width:200px"></div>
2. 内嵌方式
<head>
    <style type="text/css">
        div {
            color: red;
        }
    </style>
</head>
3. 外链方式
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
```

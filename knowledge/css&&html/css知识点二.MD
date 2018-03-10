### 选择器类型
1. 元素选择器
特点：相同类型元素全部被选中
```
p {
  color: red;
}
```
2. id选择器
特点：id值全局唯一，不能存在两个完全相同的id
```
#green {
  color: green;
}
```
3. 类选择器
特点：可应用在多个不同的元素上。可在同一元素上添加多个class（中间用空格隔开）
```
<p class="fsl4 blue"></p>
.fsl4 {
  color: bule
}
.blue {
  font-size: 16px;  
}
```

4. *选择器（通用选择权，选中全部的元素）
5. 选择器分组

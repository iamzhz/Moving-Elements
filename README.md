# Moving-Elements
你可以利用 `Moving-Elements` 独具特色地操作 DOM 元素! 

```js
let me = new Moving_Elements(document.body);
me.create_square("hi");
me.set_width("hi", "100px");
me.set_height("hi", "100px");
me.set_color("hi", "#ffd0fa")
console.log(me.get_position("hi").x)
me.set_position("hi", {x: 60, y: 30});
```

## 简介
`Moving_Elements` 是一个用于简化 DOM 元素创建、管理和操作的 JavaScript 类。它提供了一系列直观的方法，帮助你轻松创建、修改、定位元素，并为元素绑定事件，无需直接编写复杂的原生 DOM 操作代码。

## 核心功能

### 1. 初始化
通过构造函数创建 `Moving_Elements` 实例，指定元素的父容器和 ID 前缀（可选）：
```js
// 基本用法：以 document.body 为父容器
let me = new Moving_Elements(document.body);

// 带 ID 前缀：所有创建的元素 ID 会自动添加前缀 "prefix-"
let meWithPrefix = new Moving_Elements(document.body, "prefix-");
```


### 2. 元素管理
#### 添加元素
- `add_element(id)`：创建一个基础 `div` 元素并添加到父容器，返回创建的元素。若元素已存在则不重复创建。
  ```js
  let basicDiv = me.add_element("myDiv");
  ```

#### 获取元素
- `get(id)`：根据 ID 获取已创建的元素，若元素不存在返回 `undefined`。
  ```js
  let myElement = me.get("myDiv");
  ```

#### 删除元素
- `remove(id)`：从 DOM 中移除指定元素。
  ```js
  me.remove("myDiv");
  ```


### 3. 样式设置
#### 尺寸控制
- `set_width(id, width)`：设置元素宽度（支持数字或带单位的字符串，如 `100` 自动转为 `100px`）。
- `set_height(id, height)`：设置元素高度（规则同上）。
- `set_area(id, width, height)`：同时设置宽度和高度。
  ```js
  me.set_width("box", 200); // 等效于 "200px"
  me.set_height("box", "30%"); // 直接使用百分比
  me.set_area("box", 150, 150); // 同时设置宽高为 150px
  ```

#### 颜色设置
- `set_color(id, color)`：设置元素背景色（支持颜色名、十六进制、RGB 等格式）。
  ```js
  me.set_color("box", "red");
  me.set_color("box", "#ff00ff");
  me.set_color("box", "rgb(255, 100, 0)");
  ```

#### 形状创建
- `create_square(id)`：创建一个正方形（本质是基础 `div`，需手动设置尺寸）。
- `create_circle(id)`：创建一个圆形（自动设置 `border-radius: 50%`，需手动设置宽高使其为正圆）。
  ```js
  me.create_square("square");
  me.set_area("square", 100, 100); // 100x100 的正方形

  me.create_circle("circle");
  me.set_area("circle", 50, 50); // 50x50 的圆形
  ```


### 4. 位置控制
#### 获取位置
- `get_position(id)`：获取元素的绝对位置（相对于文档顶部和左侧的坐标），返回 `{x, y}` 对象。
  ```js
  let pos = me.get_position("box");
  console.log("X坐标：", pos.x, "Y坐标：", pos.y);
  ```

#### 设置位置
- `set_position(id, position)`：设置元素的绝对位置（需传入 `{x, y}` 对象，单位为像素）。
  ```js
  me.set_position("box", {x: 100, y: 200}); // 将元素移动到 (100, 200) 位置
  ```


### 5. 事件绑定
#### 元素事件
- `bind_event(id, event, handler)`：为指定元素绑定事件（如点击、鼠标移入等）。
  ```js
  // 点击元素时改变颜色
  me.bind_event("box", "click", () => {
    me.set_color("box", "green");
  });
  ```

#### 全局鼠标移动事件
- `set_event_mousemove(func)`：绑定全局鼠标移动事件，回调函数接收鼠标事件对象。
  ```js
  // 跟踪鼠标位置并移动元素
  me.set_event_mousemove((e) => {
    me.set_position("box", {x: e.clientX, y: e.clientY});
  });
  ```


## 注意事项
- 所有元素 ID 需唯一，重复添加会被忽略。
- 尺寸设置时，若传入数字（如 `100`），会自动添加 `px` 单位；若需使用其他单位（如 `%`、`em`），请传入字符串（如 `"50%"`）。
- 调用方法前请确保元素已通过 `add_element`、`create_square` 或 `create_circle` 创建，否则方法可能不生效。


通过 `Moving_Elements`，你可以快速实现元素的动态创建、样式调整和交互控制，适合用于简单的动画效果、拖拽功能或动态 UI 构建。
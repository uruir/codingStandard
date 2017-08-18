无状态函数：

```
import React from 'react'
export default function App() {
  return <h1>hello world</h1>
}
```

上面使用 `default` 表示在其它组件中可以用 `import App from './App'` 来引入 App，否则只能用 `import {App} from './App'`。

引入 `React` 是因为使用了 JSX 语法。

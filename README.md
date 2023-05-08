# filename-lint

A filename linter

## 能力

1. 校验

## 领域概念

### 整体概念

| 概念          | 描述                         |
| ------------- | ---------------------------- |
| lintConfig    | lint 配置                    |
| extension     | 后缀名                       |
| subExtension  | 子后缀名                     |
| rule          | 规则                         |
| checkFunction | 校验函数，依赖后缀名和规则   |
| checkResult   | 校验结果：通过、未通过、忽略 |

### 文件名相关概念

| 概念     | 描述         | 示例                                                  |
| -------- | ------------ | ----------------------------------------------------- |
| filename | 文件绝对路径 | /Users/fy/Documents/workspace/filename-lint/README.md |
| basename | 文件名       | README                                                |
| ext      | 文件后缀     | .md                                                   |

### 规则相关概念

| 概念                 | 描述                                         | 示例                 |
| -------------------- | -------------------------------------------- | -------------------- |
| lowercase            | 允许小写字母、数字                           | lowercase            |
| UPPERCASE            | 允许大写字母、数字                           | UPPERCASE            |
| camelCase            | 允许大小写字母、数字，且首字母需要为小写字母 | camelCase            |
| PascalCase           | 允许大小写字母、数字，且首字母需要为大写字母 | PascalCase           |
| snake_case           | 允许小写字母、数字、下划线 `_`               | snake_case           |
| kebab-case           | 允许小写字母、数字、连接符 `-`               | kebab-case           |
| point.case           | 允许小写字母、数字、点 `.`                   | point.case           |
| SCREAMING_SNAKE_CASE | 允许大写字母、数字、下划线 `_`               | SCREAMING_SNAKE_CASE |

## 校验规则

校验需要依赖文件后缀名和规则。

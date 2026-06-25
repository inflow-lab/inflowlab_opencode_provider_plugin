# inflowlab_opencode_provider_plugin

为 opencode 注册 Inflowlab 模型提供商。安装插件后，用户可以直接使用 `/connect` 搜索 `inflowlab-*`，输入 API Key 完成登录，不再需要手动维护 `auth.json` 和大段 provider 配置。

## 提供商

- `inflowlab-gpt`
- `inflowlab-deepseek`
- `inflowlab-qwen`
- `inflowlab-glm`
- `inflowlab-mimo`

## 使用方式

### 从本地文件加载

开发或本地测试时，可以直接加载仓库里的 `index.js`，不需要构建：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "D:/inflowlab_opencode_provider_plugin/index.js"
  ]
}
```

### 从 GitHub 加载

可以使用 npm 的 GitHub spec：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "github:inflow-lab/inflowlab_opencode_provider_plugin#v0.1.0"
  ]
}
```

重启 opencode 后运行 `/connect`，搜索 `inflowlab-`，选择需要的提供商并粘贴 Inflowlab API Key。

登录完成后，可以使用 `/model` 切换模型，例如：

```text
inflowlab-gpt/gpt-5.5
inflowlab-deepseek/deepseek-v4-pro
inflowlab-qwen/qwen3.7-plus
inflowlab-glm/glm-5.2
inflowlab-mimo/mimo-v2.5
```

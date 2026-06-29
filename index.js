const BASE_URL = "https://api.inflowlab.cn/v1"
const TIMEOUT = 1_200_000

const providers = [
  {
    id: "inflowlab-gpt",
    name: "Inflowlab GPT",
    npm: "@ai-sdk/openai",
    models: {
      "gpt-5.5": {
        name: "GPT-5.5",
        limit: { context: 400_000, output: 128_000 },
        reasoning: true,
        attachment: true,
        modalities: { input: ["text", "image", "pdf"], output: ["text"] },
      },
      "gpt-5.4": {
        name: "GPT-5.4",
        limit: { context: 400_000, output: 128_000 },
        reasoning: true,
        attachment: true,
        modalities: { input: ["text", "image", "pdf"], output: ["text"] },
      },
      "gpt-5.4-mini": {
        name: "GPT-5.4 mini",
        limit: { context: 400_000, output: 128_000 },
        reasoning: true,
        attachment: true,
        modalities: { input: ["text", "image"], output: ["text"] },
      },
      "gpt-5.3-codex-spark": {
        name: "GPT-5.3 Codex Spark",
        limit: { context: 128_000, output: 128_000 },
        reasoning: true,
        attachment: true,
        modalities: { input: ["text"], output: ["text"] },
      },
    },
  },
  {
    id: "inflowlab-deepseek",
    name: "Inflowlab DeepSeek",
    npm: "@ai-sdk/openai-compatible",
    models: {
      "deepseek-v4-flash": {
        name: "DeepSeek V4 Flash",
        limit: { context: 1_000_000, output: 384_000 },
        reasoning: true,
        attachment: true,
        modalities: { input: ["text"], output: ["text"] },
      },
      "deepseek-v4-pro": {
        name: "DeepSeek V4 Pro",
        limit: { context: 1_000_000, output: 384_000 },
        reasoning: true,
        attachment: true,
        modalities: { input: ["text"], output: ["text"] },
      },
    },
  },
  {
    id: "inflowlab-qwen",
    name: "Inflowlab Qwen",
    npm: "@ai-sdk/openai-compatible",
    models: {
      "qwen3.7-max": {
        name: "Qwen3.7 Max",
        limit: { context: 1_000_000, output: 65_536 },
        reasoning: true,
        attachment: true,
        modalities: { input: ["text"], output: ["text"] },
      },
      "qwen3.7-plus": {
        name: "Qwen3.7 Plus",
        limit: { context: 1_000_000, output: 64_000 },
        reasoning: true,
        attachment: true,
        modalities: { input: ["text", "image"], output: ["text"] },
      },
      "qwen3.6-flash": {
        name: "Qwen3.6 Flash",
        limit: { context: 1_000_000, output: 65_536 },
        reasoning: true,
        attachment: true,
        modalities: { input: ["text", "image", "video"], output: ["text"] },
      },
    },
  },
  {
    id: "inflowlab-glm",
    name: "Inflowlab GLM",
    npm: "@ai-sdk/openai-compatible",
    models: {
      "glm-5.2": {
        name: "GLM-5.2",
        limit: { context: 1_000_000, output: 131_072 },
        reasoning: true,
        attachment: false,
        modalities: { input: ["text"], output: ["text"] },
      },
      "glm-5.1": {
        name: "GLM-5.1",
        limit: { context: 200_000, output: 131_072 },
        reasoning: true,
        attachment: false,
        modalities: { input: ["text"], output: ["text"] },
      },
      "glm-5-turbo": {
        name: "GLM-5-Turbo",
        limit: { context: 200_000, output: 131_072 },
        reasoning: true,
        attachment: false,
        modalities: { input: ["text"], output: ["text"] },
      },
      "glm-5": {
        name: "GLM-5",
        limit: { context: 204_800, output: 131_072 },
        reasoning: true,
        attachment: false,
        modalities: { input: ["text"], output: ["text"] },
      },
      "glm-4.7": {
        name: "GLM-4.7",
        limit: { context: 204_800, output: 131_072 },
        reasoning: true,
        attachment: false,
        modalities: { input: ["text"], output: ["text"] },
      },
      "glm-4.6v": {
        name: "GLM-4.6V",
        limit: { context: 128_000, output: 32_768 },
        reasoning: true,
        attachment: true,
        modalities: { input: ["text", "image", "video"], output: ["text"] },
      },
      "glm-4.5-air": {
        name: "GLM-4.5-Air",
        limit: { context: 131_072, output: 98_304 },
        reasoning: true,
        attachment: false,
        modalities: { input: ["text"], output: ["text"] },
      },
    },
  },
]

function mergeConfigProvider(cfg, provider) {
  cfg.provider ??= {}

  const existing = cfg.provider[provider.id]
  const existingOptions = existing?.options ?? {}
  const existingModels = existing?.models ?? {}

  cfg.provider[provider.id] = {
    ...existing,
    name: existing?.name ?? provider.name,
    npm: existing?.npm ?? provider.npm,
    options: {
      baseURL: BASE_URL,
      setCacheKey: true,
      timeout: TIMEOUT,
      ...existingOptions,
    },
    models: {
      ...provider.models,
      ...existingModels,
    },
  }
}

function defineProviderPlugin(provider) {
  return async () => {
    return {
      auth: {
        provider: provider.id,
        methods: [{ type: "api", label: "Inflowlab API Key" }],
      },
      config: async (cfg) => {
        mergeConfigProvider(cfg, provider)
      },
    }
  }
}

export const InflowlabGPT = defineProviderPlugin(providers[0])
export const InflowlabDeepSeek = defineProviderPlugin(providers[1])
export const InflowlabQwen = defineProviderPlugin(providers[2])
export const InflowlabGLM = defineProviderPlugin(providers[3])

# 第三方开源许可

项目原创代码的许可见 [LICENSE](LICENSE)。本文件记录随扩展分发或用于构建扩展的主要第三方代码；服务 API、内容和商标不因此获得开源授权，另见 [第三方服务与内容来源](THIRD-PARTY-SERVICES.md)。

## 随扩展分发的代码与素材

- **Vue 3 和 @vue 运行时**：MIT。[项目](https://github.com/vuejs/core) · [完整许可证](third_party/vue/LICENSE)。版本见 `package-lock.json`。
- **AGY Claude Style**：MIT，Copyright (c) 2026 0DNANCY。AI 工作区的部分状态、用量与视觉效果代码改写自该项目；具体文件见 [ATTRIBUTION.md](ATTRIBUTION.md)。[项目](https://github.com/0DNANCY/agy-claude-style) · [完整许可证](third_party/agy-claude-style/LICENSE)。
- **dsh-claude-style**：MIT，Copyright (c) 2026 Nwflower。像素蟹宠状态机和精灵图包含来源于该项目及 AGY Claude Style 的衍生成分。[项目](https://github.com/Nwflower/dsh-claude-style) · [完整许可证及附带声明](third_party/dsh-claude-style/LICENSE)。

## Rust / WebAssembly 依赖

`crates/fast-search` 使用 wasm-bindgen、serde、serde_json 和 pulldown-cmark，生成随扩展使用的 JavaScript 胶水代码及 WASM。以下为 `crates/fast-search/Cargo.lock` 的第三方依赖及其上游声明的许可；清单也包含构建依赖，并不声称每个包都直接进入了最终 WASM。各包原始许可证、版权声明及其他随附声明保存在 `third_party/rust/<包名>-<版本>/`。

- **MIT OR Apache-2.0**：bitflags 2.13.2、bumpalo 3.20.3、cfg-if 1.0.5、itoa 1.0.19、log 0.4.35、once_cell 1.21.4、proc-macro2 1.0.107、quote 1.0.47、rustversion 1.0.23、serde 1.0.229、serde_core 1.0.229、serde_derive 1.0.229、serde_json 1.0.154、syn 2.0.119 和 3.0.10、unicase 2.10.0、wasm-bindgen 0.2.100、wasm-bindgen-backend 0.2.100、wasm-bindgen-macro 0.2.100、wasm-bindgen-macro-support 0.2.100、wasm-bindgen-shared 0.2.100。
- **MIT**：pulldown-cmark 0.13.6、pulldown-cmark-escape 0.11.0、zmij 1.0.23。
- **Unlicense OR MIT**：memchr 2.8.3。
- **(MIT OR Apache-2.0) AND Unicode-3.0**：unicode-ident 1.0.27。

主要直接依赖的完整许可证：[wasm-bindgen MIT](third_party/rust/wasm-bindgen-0.2.100/LICENSE-MIT) / [Apache-2.0](third_party/rust/wasm-bindgen-0.2.100/LICENSE-APACHE)、[serde MIT](third_party/rust/serde-1.0.229/LICENSE-MIT) / [Apache-2.0](third_party/rust/serde-1.0.229/LICENSE-APACHE)、[serde_json MIT](third_party/rust/serde_json-1.0.154/LICENSE-MIT) / [Apache-2.0](third_party/rust/serde_json-1.0.154/LICENSE-APACHE)、[pulldown-cmark MIT](third_party/rust/pulldown-cmark-0.13.6/LICENSE)。

`wasm-pack` 是生成 WASM 的独立构建工具，不作为 npm 运行时依赖随扩展提供。[wasm-pack 项目及许可](https://github.com/rustwasm/wasm-pack)。构建工具和其他 npm 依赖见 `package.json` 和 `package-lock.json`；`node_modules` 不随扩展分发。

更新依赖或重新生成 WASM 时，应同步核对锁文件、实际产物和本目录中的许可证。已提交的 WASM 是构建产物，锁文件本身不能证明它由当前锁文件生成。

# 💎 Jewelry Listing Automation

珠宝 Listing 自动化工具 - 为 Etsy 卖家打造的智能商品发布工作流

[![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)](https://github.com/robinzorro/jewelry-listing)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16-lightgrey.svg)](https://nodejs.org)

## 🌟 特性

- ⚡ **快速生成** - 从商品信息到完整 Listing 只需几秒
- 📝 **智能优化** - 自动生成符合 Etsy 搜索优化的标题和标签
- 🖼️ **图片处理** - 自动调整尺寸、压缩、重命名
- 📦 **批量处理** - 一次性处理多个 SKU
- 🎯 **Etsy 专用** - 完全符合 Etsy 平台规范

## 📦 安装

### 前置要求

- Node.js >= 16
- npm >= 8

### 安装依赖

```bash
git clone https://github.com/robinzorro/jewelry-listing.git
cd jewelry-listing
npm install
```

### 全局安装（可选）

```bash
npm link
```

## 🚀 Quick Start

### 1️⃣ 准备商品资料

创建 SKU 文件夹结构：

```bash
mkdir -p ~/jewelry-listings/SKU-001
```

创建 `info.md` 文件：

```markdown
---
sku: SKU-001
title: 18K 金天然珍珠项链
category: necklace
material:
  - 18K Gold
  - Freshwater Pearl
dimensions:
  chain_length: 45cm
  pearl_size: 8-9mm
  weight: 12.5g
style:
  - Minimalist
  - Elegant
occasion:
  - Daily
  - Wedding
price: 29800
currency: JPY
condition: new
---

## 商品详情

这款优雅的珍珠项链采用日本 Akoya 海水珍珠...

## 尺寸说明

- 链条长度：45cm
- 珍珠直径：8-9mm

## 保养说明

避免接触香水、化妆品...
```

放入商品照片（3-10 张）：

```bash
cp /path/to/photos/*.jpg ~/jewelry-listings/SKU-001/
```

### 2️⃣ 生成 Listing

```bash
# 处理单个 SKU
npx jewelry-listing process ~/jewelry-listings/SKU-001

# 或使用本地安装
node bin/cli.js process ~/jewelry-listings/SKU-001
```

### 3️⃣ 查看输出

```bash
ls ~/jewelry-listings/output/SKU-001/
```

输出内容：

```
SKU-001/
├── listing.md          # 完整的 Listing 内容
├── title.txt           # 优化后的标题
├── description.md      # 商品描述
├── tags.txt            # 13 个 Etsy 标签
├── attributes.json     # 商品属性 JSON
└── images/             # 优化后的图片
    ├── 01_main.jpg
    ├── 02_angle.jpg
    ├── 03_detail.jpg
    └── ...
```

### 4️⃣ 上传到 Etsy

1. 登录 [Etsy Seller Dashboard](https://www.etsy.com/sell)
2. 点击 "Add a listing"
3. 复制粘贴生成的内容：
   - **Title** ← `title.txt`
   - **Description** ← `description.md`
   - **Tags** ← `tags.txt` (13 个标签)
   - **Attributes** ← 参考 `attributes.json`
4. 上传优化后的图片（`images/` 目录）
5. 设置价格和运费
6. 发布 ✨

## 📖 命令详解

### process - 处理单个 SKU

```bash
npx jewelry-listing process <sku-folder> [options]
```

**选项**:
- `-o, --output <dir>` - 输出目录（默认：`./output`）
- `-v, --verbose` - 详细输出
- `--force` - 覆盖已存在的输出目录

**示例**:
```bash
npx jewelry-listing process ./SKU-001 -o ./output -v
```

### batch - 批量处理

```bash
npx jewelry-listing batch <input-dir> [options]
```

**选项**:
- `-o, --output <dir>` - 输出目录（默认：`./output`）
- `-l, --limit <number>` - 限制处理数量
- `-v, --verbose` - 详细输出

**示例**:
```bash
npx jewelry-listing batch ~/jewelry-listings/ -l 10
```

### images - 优化图片

```bash
npx jewelry-listing images <sku-folder> [options]
```

**选项**:
- `--resize <WxH>` - 调整尺寸（默认：`2000x2000`）
- `--quality <1-100>` - JPEG 质量（默认：`85`）
- `--format <jpg|png>` - 输出格式（默认：`jpg`）
- `--background <color>` - 背景色（默认：`#FFFFFF`）
- `-o, --output <dir>` - 输出目录

**示例**:
```bash
npx jewelry-listing images ./SKU-001 --resize 2000x2000 --quality 90
```

## 📋 info.md 格式

### 必填字段

```yaml
---
sku: string          # 唯一商品编码
title: string        # 商品名称
category: string     # 商品类型
material: string[]   # 材质数组
price: number        # 价格
currency: string     # 货币代码
---
```

### 商品类型（category）

| 值 | 说明 |
|----|------|
| `necklace` | 项链 |
| `earrings` | 耳环 |
| `ring` | 戒指 |
| `bracelet` | 手链/手镯 |
| `pendant` | 吊坠 |
| `brooch` | 胸针 |
| `set` | 套装 |

### 可选字段

```yaml
dimensions:
  chain_length: string    # 链条长度
  pearl_size: string      # 珍珠尺寸
  weight: string          # 重量
  ring_size: string       # 戒指尺寸

style: string[]           # 风格标签
occasion: string[]        # 适用场景
made_to_order: boolean    # 是否定制
processing_time: string   # 处理时间
condition: string         # 商品状态
```

## 🏷️ 标签策略

自动生成 13 个 Etsy 标签，按照以下策略：

| 位置 | 类型 | 示例 |
|------|------|------|
| 1-3 | 商品类型 | necklace, pearl necklace, jewelry |
| 4-6 | 材质 | 18k gold, freshwater pearl |
| 7-9 | 风格 | minimalist, elegant, modern |
| 10-12 | 场景 | wedding, party, daily |
| 13 | 受众 | gift for her |

## 🖼️ 图片规范

### Etsy 要求

- **最小尺寸**: 2000 像素
- **推荐尺寸**: 2000x2000px
- **格式**: JPG 或 PNG
- **大小**: 每张 < 20MB
- **数量**: 1-10 张

### 图片角色

| 文件名 | 用途 |
|--------|------|
| `01_main.jpg` | 主图（正方形，白底） |
| `02_angle.jpg` | 角度图 |
| `03_detail.jpg` | 细节图 |
| `04_wearing.jpg` | 佩戴效果图 |
| `05_size.jpg` | 尺寸对比图 |

## 📊 输出示例

### title.txt
```
18K Gold Freshwater Pearl Necklace Minimalist Elegant Wedding Jewelry
```

### tags.txt
```
necklace, pearl necklace, 18k gold jewelry, freshwater pearl, minimalist, 
elegant, wedding necklace, bridal, party gift, daily wear, gift for her, 
women jewelry, japanese pearl
```

### attributes.json
```json
{
  "sku": "SKU-001",
  "title": "18K Gold Freshwater Pearl Necklace",
  "category": {
    "main": "Jewelry",
    "sub": "Necklaces",
    "specific": "necklace"
  },
  "materials": {
    "primary": "18K Gold",
    "secondary": "Freshwater Pearl"
  },
  "price": {
    "amount": 29800,
    "currency": "JPY"
  }
}
```

## 🔧 开发

### 本地测试

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 本地运行 CLI
node bin/cli.js process ./examples/SKU-001
```

### 项目结构

```
jewelry-listing/
├── bin/
│   └── cli.js          # CLI 主程序
├── examples/           # 示例文件
├── lib/                # 核心库（待开发）
├── test/               # 测试文件
├── package.json
└── README.md
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 更新日志

### 3.0.0 (2026-04-04)
- 🎉 初始版本发布
- ✨ 支持单个 SKU 处理
- ✨ 支持批量处理
- ✨ 图片优化功能
- ✨ Etsy 格式输出
- ✨ 自动生成标题、标签、描述

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 👤 作者

**Robin.Z**

- GitHub: [@robinzorro](https://github.com/robinzorro)
- Email: [你的邮箱]

## 🙏 致谢

感谢所有贡献者和使用者！

---

<div align="center">

**Made with 💎 for Etsy Sellers**

如果这个项目对你有帮助，请给一个 ⭐️ Star！

</div>

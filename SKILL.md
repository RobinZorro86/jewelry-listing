---
name: Jewelry Listing Automation
slug: jewelry-listing
version: 3.0.0
changelog: Initial release - Etsy jewelry listing automation workflow
description: 珠宝 Listing 自动化工作流，从商品信息和照片生成完整的 Etsy Listing 内容。
metadata: {"clawdbot":{"emoji":"💎","requires":{"bins":["node","sharp"]},"os":["linux","darwin","win32"]}}
---

## When to Use

用户需要为珠宝商品创建 Etsy Listing 时，此技能帮助：
- 从 SKU 文件夹读取商品信息和照片
- 自动生成标题、描述、标签
- 优化商品属性（材质、尺寸、风格等）
- 批量处理多个 SKU

## Quick Reference

| Topic | File |
|-------|------|
| 工作流说明 | `workflow.md` |
| 输入格式规范 | `input-format.md` |
| 输出模板 | `templates.md` |
| 图片处理 | `image-processing.md` |

## 工作流

### 第一步：准备输入文件夹结构

```
~/jewelry-listings/
├── SKU-001/
│   ├── info.md          # 商品信息（材质、尺寸、SKU 等）
│   ├── photo_01.jpg     # 实物照片 1
│   ├── photo_02.jpg     # 实物照片 2
│   ├── photo_03.jpg     # 实物照片 3
│   └── photo_04.jpg     # 实物照片 4
├── SKU-002/
│   └── ...
└── output/              # 生成的 Listing 内容
```

### 第二步：info.md 格式

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
  - Party
price: 29800
currency: JPY
condition: new
made_to_order: false
---

## 商品详情

这款项链采用日本 Akoya 海水珍珠，搭配 18K 金链条...

## 尺寸说明

- 链条长度：45cm（可调节至 42cm）
- 珍珠直径：8-9mm
- 总重量：约 12.5g
```

### 第三步：运行自动化

```bash
# 处理单个 SKU
npx jewelry-listing process ~/jewelry-listings/SKU-001

# 批量处理所有 SKU
npx jewelry-listing batch ~/jewelry-listings/

# 生成图片优化版本
npx jewelry-listing images ~/jewelry-listings/SKU-001 --resize 2000x2000
```

### 第四步：输出内容

```
~/jewelry-listings/output/SKU-001/
├── listing.md           # 完整的 Listing 内容
├── title.txt            # 优化后的标题
├── description.md       # 商品描述
├── tags.txt             # 13 个 Etsy 标签
├── attributes.json      # 商品属性 JSON
└── images/              # 优化后的图片
    ├── photo_01_opt.jpg
    ├── photo_02_opt.jpg
    └── ...
```

## Core Rules

### 1. 标题优化（140 字符以内）

```
[材质] [主石] [商品类型] [风格] [适用场景] [品牌/特色]
```

示例：
- ✅ `18K Gold Freshwater Pearl Necklace Minimalist Elegant Wedding Jewelry`
- ❌ `Beautiful Pearl Necklace WOW Amazing Deal`

规则：
- 前 40 字符包含最重要的关键词
- 包含材质、主石、商品类型
- 避免感叹号、全大写、填充词

### 2. 描述结构

```markdown
## ✨ 亮点
- 核心卖点 1
- 核心卖点 2

## 📏 规格
- 尺寸、重量、材质详情

## 🎁 包装与配送
- 包装方式、发货时间

## 💎 保养说明
- 珠宝保养建议
```

### 3. Etsy 标签策略（13 个标签）

| 类型 | 数量 | 示例 |
|------|------|------|
| 商品类型 | 3-4 | necklace, pendant, jewelry |
| 材质 | 2-3 | gold, pearl, 18k |
| 风格 | 2-3 | minimalist, elegant, modern |
| 场景 | 2-3 | wedding, party, daily |
| 受众 | 1-2 | women, gift, her |

### 4. 图片处理标准

- **主图**: 2000x2000px 正方形，白色/浅色背景
- **细节图**: 展示材质、刻印、扣环
- **佩戴图**: 展示实际上身效果
- **尺寸对比**: 用硬币/尺子展示实际大小

### 5. 定价策略

Etsy 费用结构：
- Listing 费：$0.20/个（4 个月）
- 交易费：6.5%
- 支付处理费：约 3% + ¥30

**快速估算**: 售价的 10-12% 为平台费用

### 6. 商品属性必填项

| 属性 | 必填 | 示例 |
|------|------|------|
| Category | ✅ | Jewelry → Necklaces |
| Primary color | ✅ | Gold, White, Silver |
| Secondary color | ✅ | Pearl, Cream |
| Main material | ✅ | Gold, Sterling Silver |
| Material details | ✅ | 18K Gold, Freshwater Pearl |
| Gemstone | ✅ | Pearl, Diamond, Sapphire |
| Occasion | ✅ | Wedding, Party, Daily |
| Style | ✅ | Minimalist, Bohemian, Vintage |

### 7. 发货设置

- **处理时间**: 1-3 个工作日（定制款 5-7 天）
- **配送方式**: 
  - 国内：ゆうパック/レターパック
  - 国际：EMS/DHL
- **包装**: 防震首饰盒 + 气泡袋

## 输入要求

### info.md 必填字段

```yaml
sku: string          # 唯一 SKU
title: string        # 商品名称
category: string     # necklace/earrings/ring/bracelet
material: string[]   # 材质列表
price: number        # 价格
currency: string     # JPY/USD/EUR
```

### 图片要求

- 最少 3 张，最多 10 张
- 第一张作为主图（正方形最佳）
- JPG/PNG 格式
- 每张 < 10MB

## 输出格式

### listing.md

```markdown
---
sku: SKU-001
title: [优化后的标题]
price: 29800
currency: JPY
category: Jewelry → Necklaces
tags: [13 个标签]
---

[完整的商品描述]
```

### attributes.json

```json
{
  "sku": "SKU-001",
  "category": "necklace",
  "materials": ["18K Gold", "Freshwater Pearl"],
  "dimensions": {
    "chain_length": "45cm",
    "pearl_size": "8-9mm",
    "weight": "12.5g"
  },
  "style": ["Minimalist", "Elegant"],
  "occasion": ["Daily", "Wedding", "Party"],
  "made_to_order": false,
  "processing_time": "1-3 business days"
}
```

## Common Traps

| 陷阱 | 后果 | 更好的做法 |
|------|------|-----------|
| 标题堆砌关键词 | 被 Etsy 降权 | 自然语言，可读性优先 |
| 图片太小/模糊 | 转化率低 | 至少 2000px 宽 |
| 标签太宽泛 | 曝光低 | 使用长尾关键词 |
| 描述太短 | 买家疑虑 | 包含所有细节 |
| 忽略保养说明 | 售后问题 | 添加保养指南 |
| 不填商品属性 | 搜索排名低 | 完整填写所有属性 |

## Scope

此技能负责：
- 读取 SKU 文件夹中的 info.md 和图片
- 生成优化的标题、描述、标签
- 输出符合 Etsy 格式的商品数据
- 批量处理多个 SKU

此技能不负责：
- 直接上传到 Etsy（需手动或 API 集成）
- 库存管理
- 订单处理

## Data Storage

输入数据：`~/jewelry-listings/{SKU}/`
输出数据：`~/jewelry-listings/output/{SKU}/`

## Related Skills

可配合使用：
- `ebay` - 电商平台运营经验
- `ai-humanizer` - 优化商品描述
- `nano-banana-pro` - 生成商品图片

## Feedback

- 报告问题：在 workspace 提 issue
- 功能建议：发送消息给 @Robin.Z

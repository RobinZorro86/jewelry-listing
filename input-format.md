# Input Format Specification

## info.md 格式规范

### 必填字段（Front Matter）

```yaml
---
sku: string          # 唯一商品编码，如 "SKU-001"
title: string        # 商品名称，如 "18K 金天然珍珠项链"
category: string     # 商品类型
material: string[]   # 材质数组
price: number        # 价格（数字）
currency: string     # 货币代码：JPY, USD, EUR
---
```

### 商品类型（category）

| 值 | 说明 | Etsy 分类 |
|----|------|----------|
| `necklace` | 项链 | Jewelry → Necklaces |
| `earrings` | 耳环 | Jewelry → Earrings |
| `ring` | 戒指 | Jewelry → Rings |
| `bracelet` | 手链/手镯 | Jewelry → Bracelets |
| `pendant` | 吊坠 | Jewelry → Pendants |
| `brooch` | 胸针 | Jewelry → Brooches |
| `set` | 套装 | Jewelry → Jewelry Sets |
| `anklet` | 脚链 | Jewelry → Anklets |

### 材质（material）

常用材质值：

**金属类**:
- `18K Gold`
- `14K Gold`
- `9K Gold`
- `Sterling Silver`
- `Silver 925`
- `Platinum`
- `Brass`
- `Copper`

**宝石类**:
- `Freshwater Pearl`
- `Akoya Pearl`
- `Diamond`
- `Ruby`
- `Sapphire`
- `Emerald`
- `Opal`
- `Turquoise`
- `Amethyst`

**其他**:
- `Leather`
- `Silk`
- `Beads`
- `Resin`
- `Wood`

### 可选字段

```yaml
dimensions:
  chain_length: string    # 链条长度，如 "45cm"
  pearl_size: string      # 珍珠尺寸，如 "8-9mm"
  weight: string          # 重量，如 "12.5g"
  ring_size: string       # 戒指尺寸，如 "US 7 / JP 13"
  pendant_size: string    # 吊坠尺寸，如 "20mm x 15mm"

style: string[]           # 风格标签
  - Minimalist
  - Elegant
  - Vintage
  - Modern
  - Bohemian
  - Classic
  - Contemporary

occasion: string[]        # 适用场景
  - Daily
  - Wedding
  - Party
  - Gift
  - Anniversary
  - Birthday
  - Engagement

made_to_order: boolean    # 是否定制（默认 false）
processing_time: string   # 处理时间，如 "1-3 business days"
condition: string         # 商品状态：new, used, vintage
brand: string             # 品牌名称
```

## 商品详情（正文部分）

### 推荐结构

```markdown
## 商品详情

[这里写商品的详细介绍，包括设计灵感、工艺特点等]

## 尺寸说明

[详细的尺寸信息]

## 材质说明

[材质的详细介绍和保养建议]

## 包装与配送

[包装方式和发货时间]

## 保养说明

[珠宝保养建议]
```

### 完整示例

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
processing_time: 1-3 business days
---

## 商品详情

这款优雅的珍珠项链采用日本 Akoya 海水珍珠，每一颗都经过精心挑选，
呈现出完美的光泽和圆润度。18K 金链条细腻精致，适合各种场合佩戴。

设计灵感来自简约美学，既可作为日常配饰，也能在重要场合增添光彩。

## 尺寸说明

- 链条长度：45cm（可调节至 42cm）
- 珍珠直径：8-9mm
- 珍珠等级：AAA
- 总重量：约 12.5g

## 材质说明

- 链条：18K 金（Au750）
- 珍珠：日本 Akoya 海水珍珠
- 扣环：18K 金弹簧扣

## 包装与配送

- 包装：精美首饰盒 + 礼品袋
- 发货时间：1-3 个工作日
- 配送方式：日本邮政ゆうパック（附带追踪号）

## 保养说明

1. 避免接触香水、化妆品和化学品
2. 沐浴、游泳时请摘下
3. 不佩戴时放入首饰盒保存
4. 定期用软布轻轻擦拭
5. 建议每年专业清洁一次
```

## 图片文件命名规范

```
photo_01.jpg    # 主图（必须是第一张）
photo_02.jpg    # 侧面/背面图
photo_03.jpg    # 细节图
photo_04.jpg    # 佩戴效果图
photo_05.jpg    # 尺寸对比图
...
```

### 图片要求

| 要求 | 说明 |
|------|------|
| 格式 | JPG 或 PNG |
| 大小 | 每张 < 10MB |
| 分辨率 | 建议 2000x2000px 或更高 |
| 数量 | 最少 3 张，最多 10 张 |
| 主图 | 正方形最佳，白色/浅色背景 |

## 验证清单

在运行自动化之前，检查：

- [ ] info.md 存在于 SKU 文件夹中
- [ ] 所有必填字段都已填写
- [ ] 至少 3 张照片
- [ ] 照片清晰、光线良好
- [ ] 价格和货币正确
- [ ] SKU 编码唯一

## 常见错误

| 错误 | 修复方法 |
|------|----------|
| 缺少必填字段 | 检查 front matter 是否完整 |
| 材质拼写错误 | 使用标准材质名称 |
| 图片格式不支持 | 转换为 JPG 或 PNG |
| 价格格式错误 | 使用数字，不要带货币符号 |
| category 值无效 | 参考上面的 category 列表 |

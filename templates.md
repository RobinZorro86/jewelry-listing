# Output Templates

## listing.md 模板

```markdown
---
sku: {{sku}}
title: {{optimized_title}}
price: {{price}}
currency: {{currency}}
category: {{etsy_category}}
tags: {{tags_array}}
---

## ✨ 商品亮点

{{highlights}}

## 📏 规格详情

{{specifications}}

## 🎁 包装与配送

{{shipping_info}}

## 💎 保养建议

{{care_instructions}}

---

**商品编号**: {{sku}}
**材质**: {{materials}}
**风格**: {{style}}
```

## title.txt 模板

```
{{material}} {{gemstone}} {{category}} {{style}} {{occasion}} {{feature}}
```

### 示例

```
18K Gold Freshwater Pearl Necklace Minimalist Elegant Wedding Jewelry Gift
```

### 字符限制

- **Etsy**: 140 字符
- **推荐**: 80-120 字符（移动端友好）
- **关键词前置**: 前 40 字符最重要

## description.md 模板

```markdown
## ✨ 商品亮点

• {{highlight_1}}
• {{highlight_2}}
• {{highlight_3}}

## 📏 规格详情

| 项目 | 详情 |
|------|------|
| 材质 | {{materials}} |
| 尺寸 | {{dimensions}} |
| 重量 | {{weight}} |
| 颜色 | {{color}} |
| 风格 | {{style}} |

## 🎁 包装与配送

**包装内容**:
- 商品本体
- 精美首饰盒
- 礼品袋
- 保养说明卡

**发货时间**: {{processing_time}}
**配送方式**: {{shipping_method}}
**预计送达**: {{delivery_time}}

## 💎 保养建议

1. {{care_1}}
2. {{care_2}}
3. {{care_3}}
4. {{care_4}}

## ❓ 常见问题

**Q: 可以调节长度吗？**
A: {{answer_customization}}

**Q: 是否支持退货？**
A: {{answer_returns}}

**Q: 可以提供礼品包装吗？**
A: {{answer_gift_wrap}}

---

感谢光临本店！如有任何问题，请随时联系。
```

## tags.txt 模板

```
{{tag_1}}, {{tag_2}}, {{tag_3}}, {{tag_4}}, {{tag_5}}, {{tag_6}}, {{tag_7}}, {{tag_8}}, {{tag_9}}, {{tag_10}}, {{tag_11}}, {{tag_12}}, {{tag_13}}
```

### 标签策略

| 位置 | 类型 | 示例 |
|------|------|------|
| 1-3 | 商品类型 | necklace, pearl necklace, jewelry |
| 4-6 | 材质 | 18k gold, freshwater pearl, gold jewelry |
| 7-9 | 风格 | minimalist, elegant, modern |
| 10-12 | 场景 | wedding jewelry, party gift, daily wear |
| 13 | 受众 | gift for her, women jewelry |

### 标签示例（珍珠项链）

```
necklace, pearl necklace, 18k gold jewelry, freshwater pearl, minimalist necklace, 
elegant jewelry, wedding necklace, bridal jewelry, party gift, daily wear, 
gift for her, women jewelry, japanese pearl
```

## attributes.json 模板

```json
{
  "sku": "{{sku}}",
  "title": "{{title}}",
  "category": {
    "main": "Jewelry",
    "sub": "Necklaces",
    "specific": "{{category}}"
  },
  "materials": {
    "primary": "{{primary_material}}",
    "secondary": "{{secondary_material}}",
    "details": "{{material_details}}"
  },
  "dimensions": {
    {{#dimensions}}
    "{{key}}": "{{value}}",
    {{/dimensions}}
  },
  "style": {{style_array}},
  "occasion": {{occasion_array}},
  "color": {
    "primary": "{{primary_color}}",
    "secondary": "{{secondary_color}}"
  },
  "gemstone": {
    "type": "{{gemstone_type}}",
    "size": "{{gemstone_size}}",
    "grade": "{{gemstone_grade}}"
  },
  "condition": "{{condition}}",
  "made_to_order": {{made_to_order}},
  "processing_time": "{{processing_time}}",
  "price": {
    "amount": {{price}},
    "currency": "{{currency}}"
  },
  "weight": "{{weight}}",
  "brand": "{{brand}}"
}
```

## 图片输出规范

### 文件命名

```
images/
├── 01_main.jpg         # 主图（正方形，白底）
├── 02_angle.jpg        # 角度图
├── 03_detail.jpg       # 细节图
├── 04_wearing.jpg      # 佩戴图
├── 05_size.jpg         # 尺寸对比图
└── 06_packaging.jpg    # 包装图（可选）
```

### 优化参数

```json
{
  "resize": {
    "width": 2000,
    "height": 2000,
    "fit": "contain",
    "background": "#FFFFFF"
  },
  "quality": 85,
  "format": "jpg",
  "compression": "balanced"
}
```

## 完整输出示例

### SKU-001 输出

**listing.md**:
```markdown
---
sku: SKU-001
title: 18K Gold Freshwater Pearl Necklace Minimalist Elegant Wedding Jewelry
price: 29800
currency: JPY
category: Jewelry → Necklaces
tags: ["necklace", "pearl necklace", "18k gold", "freshwater pearl", "minimalist", "elegant", "wedding", "bridal", "party", "daily wear", "gift for her", "women", "japanese pearl"]
---

## ✨ 商品亮点

• 日本 Akoya 海水珍珠，AAA 级品质
• 18K 金链条，不易褪色
• 简约设计，适合多种场合

## 📏 规格详情

| 项目 | 详情 |
|------|------|
| 材质 | 18K 金，Akoya 珍珠 |
| 尺寸 | 链长 45cm，珍珠 8-9mm |
| 重量 | 约 12.5g |
| 颜色 | 金色，白色 |
| 风格 | 简约，优雅 |

## 🎁 包装与配送

**包装内容**:
- 珍珠项链本体
- 精美首饰盒
- 礼品袋
- 保养说明卡

**发货时间**: 1-3 个工作日
**配送方式**: 日本邮政ゆうパック
**预计送达**: 2-4 天（日本国内）

## 💎 保养建议

1. 避免接触香水、化妆品
2. 沐浴、游泳时请摘下
3. 不佩戴时放入首饰盒
4. 定期用软布轻轻擦拭

---

**商品编号**: SKU-001
**材质**: 18K Gold, Freshwater Pearl
**风格**: Minimalist, Elegant
```

**tags.txt**:
```
necklace, pearl necklace, 18k gold jewelry, freshwater pearl, minimalist necklace, 
elegant jewelry, wedding necklace, bridal jewelry, party gift, daily wear, 
gift for her, women jewelry, japanese pearl
```

**attributes.json**:
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
    "secondary": "Freshwater Pearl",
    "details": "18K Gold Chain, AAA Grade Akoya Pearl"
  },
  "dimensions": {
    "chain_length": "45cm",
    "pearl_size": "8-9mm",
    "weight": "12.5g"
  },
  "style": ["Minimalist", "Elegant"],
  "occasion": ["Daily", "Wedding", "Party"],
  "color": {
    "primary": "Gold",
    "secondary": "White"
  },
  "gemstone": {
    "type": "Pearl",
    "size": "8-9mm",
    "grade": "AAA"
  },
  "condition": "new",
  "made_to_order": false,
  "processing_time": "1-3 business days",
  "price": {
    "amount": 29800,
    "currency": "JPY"
  },
  "weight": "12.5g",
  "brand": ""
}
```

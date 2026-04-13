# 🚀 Quick Start Guide (v3.1.0)

5 分钟快速上手珠宝 Listing 自动化（**新增 AI 图片识别**）

## 前置准备

### 1. 检查环境

```bash
# 检查 Node.js 版本（需要 >= 16）
node -v

# 检查 npm
npm -v
```

如果没有安装 Node.js，请前往 [nodejs.org](https://nodejs.org) 下载安装。

### 2. 安装工具

```bash
# 克隆仓库
git clone https://github.com/robinzorro/jewelry-listing.git
cd jewelry-listing

# 安装依赖
npm install
```

## 第一步：创建示例 SKU

### 创建文件夹

```bash
# 创建工作目录
mkdir -p ~/jewelry-listings/SKU-001
```

### 创建 info.md

复制以下内容到 `~/jewelry-listings/SKU-001/info.md`：

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

### 准备照片

将 3-5 张商品照片复制到文件夹：

```bash
# 示例：从某处复制照片
cp /path/to/your/photos/*.jpg ~/jewelry-listings/SKU-001/

# 或者使用示例照片（如果有）
cp ~/jewelry-listing/examples/photos/*.jpg ~/jewelry-listings/SKU-001/
```

**照片要求**：
- 格式：JPG 或 PNG
- 数量：最少 3 张
- 第一张作为主图（最好是正方形）

## 第二步：运行自动化

### 处理单个 SKU

```bash
cd ~/jewelry-listing

# 运行处理命令
node bin/cli.js process ~/jewelry-listings/SKU-001 -o ~/jewelry-listings/output -v
```

**输出示例**：
```
💎 处理 SKU: /Users/xxx/jewelry-listings/SKU-001
  📷 photo_01.jpg → 01_main.jpg
  📷 photo_02.jpg → 02_angle.jpg
  📷 photo_03.jpg → 03_detail.jpg
  📷 photo_04.jpg → 04_wearing.jpg
✅ 处理完成：SKU-001
📁 输出目录：/Users/xxx/jewelry-listings/output/SKU-001
📷 处理图片：4 张
```

## 第三步：查看输出

### 输出文件结构

```bash
ls -la ~/jewelry-listings/output/SKU-001/
```

你会看到：

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
    └── 04_wearing.jpg
```

### 查看生成的内容

**标题** (`title.txt`):
```
18K Gold Freshwater Pearl Necklace Minimalist Elegant Wedding Jewelry
```

**标签** (`tags.txt`):
```
necklace, pearl necklace, 18k gold jewelry, freshwater pearl, minimalist, 
elegant, wedding necklace, bridal jewelry, party gift, daily wear, 
gift for her, women jewelry, japanese pearl
```

**属性** (`attributes.json`):
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
    "details": "18K Gold, Freshwater Pearl"
  },
  "dimensions": {
    "chain_length": "45cm",
    "pearl_size": "8-9mm",
    "weight": "12.5g"
  },
  "style": ["Minimalist", "Elegant"],
  "occasion": ["Daily", "Wedding", "Party"],
  "condition": "new",
  "made_to_order": false,
  "processing_time": "1-3 business days",
  "price": {
    "amount": 29800,
    "currency": "JPY"
  }
}
```

## 第四步：上传到 Etsy

### 1. 登录 Etsy

访问 [Etsy Seller Dashboard](https://www.etsy.com/sell)

### 2. 创建新 Listing

点击 **"Add a listing"**

### 3. 填写内容

#### 照片
- 上传 `images/` 目录中的所有图片
- 拖拽排序：`01_main.jpg` 作为封面

#### 标题
- 复制 `title.txt` 的内容
- 粘贴到 **Title** 字段

#### 描述
- 复制 `description.md` 的内容
- 粘贴到 **Description** 字段
- 可根据需要调整格式

#### 分类
- 选择：**Jewelry → Necklaces**

#### 属性
参考 `attributes.json` 填写：
- **Primary color**: Gold
- **Secondary color**: White
- **Main material**: Gold
- **Material details**: 18K Gold, Freshwater Pearl
- **Gemstone**: Pearl
- **Occasion**: Wedding, Party, Daily
- **Style**: Minimalist, Elegant

#### 标签
- 复制 `tags.txt` 的内容
- 粘贴到 **Tags** 字段（自动分割为 13 个标签）

#### 价格
- **Price**: ¥29,800
- **Currency**: JPY

#### 库存与 SKU
- **SKU**: SKU-001
- **Quantity**: 1（或实际库存）

#### 配送
- **Processing time**: 1-3 business days
- **Shipping from**: Japan
- 设置运费模板

### 4. 预览并发布

- 点击 **Preview** 检查效果
- 确认无误后点击 **Publish**

## 批量处理（可选）

如果有多个 SKU 需要处理：

### 准备多个 SKU

```bash
# 创建更多 SKU 文件夹
mkdir -p ~/jewelry-listings/SKU-002
mkdir -p ~/jewelry-listings/SKU-003

# 为每个 SKU 创建 info.md 和照片
# ...
```

### 运行批量处理

```bash
node bin/cli.js batch ~/jewelry-listings/ -o ~/jewelry-listings/output -v
```

**输出示例**：
```
📦 批量处理：/Users/xxx/jewelry-listings
✅ SKU-001
✅ SKU-002
✅ SKU-003

📊 汇总：3 成功，0 失败
📁 输出目录：/Users/xxx/jewelry-listings/output
📄 汇总报告：/Users/xxx/jewelry-listings/output/batch-summary.md
```

## 图片优化（可选）

单独优化图片：

```bash
node bin/cli.js images ~/jewelry-listings/SKU-001 \
  --resize 2000x2000 \
  --quality 90 \
  --format jpg \
  -o ~/jewelry-listings/output/SKU-001/images
```

## 常见问题

### Q: 找不到 info.md？

**A**: 确保文件路径正确，且文件名为 `info.md`（全小写）

```bash
ls ~/jewelry-listings/SKU-001/info.md
```

### Q: 图片格式不支持？

**A**: 将图片转换为 JPG 或 PNG 格式

```bash
# 使用 ImageMagick 转换
convert input.png output.jpg
```

### Q: 输出目录已存在？

**A**: 使用 `--force` 选项覆盖

```bash
node bin/cli.js process ~/jewelry-listings/SKU-001 --force
```

### Q: 如何修改生成的内容？

**A**: 直接编辑输出文件即可

```bash
# 编辑生成的描述
vim ~/jewelry-listings/output/SKU-001/description.md
```

## 下一步

- 📖 阅读完整文档：[README.md](README.md)
- 📋 查看输入格式：[input-format.md](docs/input-format.md)
- 🎨 学习图片处理：[image-processing.md](docs/image-processing.md)
- 🏷️ 了解标签策略：[SKILL.md](SKILL.md)

## 获取帮助

遇到问题？

1. 查看 [Issues](https://github.com/robinzorro/jewelry-listing/issues)
2. 提交新的 Issue
3. 联系作者

---

**Happy Selling! 💎**

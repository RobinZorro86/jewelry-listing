# Jewelry Listing Workflow

## 完整工作流

### 阶段 1: 准备商品资料

```bash
# 1. 创建 SKU 文件夹
mkdir -p ~/jewelry-listings/SKU-001

# 2. 准备 info.md（商品信息）
# 3. 放入商品照片（3-10 张）
```

### 阶段 2: 生成 Listing 内容

```bash
# 处理单个 SKU
cd ~/jewelry-listings
npx jewelry-listing process ./SKU-001

# 输出到 ./output/SKU-001/
```

### 阶段 3: 审核与调整

检查生成的内容：
- ✅ 标题是否包含关键信息
- ✅ 描述是否完整准确
- ✅ 标签是否相关且多样化
- ✅ 图片是否清晰

### 阶段 4: 上传到 Etsy

1. 登录 Etsy Seller Dashboard
2. 点击 "Add a listing"
3. 复制粘贴生成的内容：
   - Title → 标题
   - Description → 描述
   - Tags → 13 个标签
   - Attributes → 从 attributes.json 读取
4. 上传优化后的图片
5. 设置价格和运费
6. 发布

## 批量处理流程

```bash
# 一次性处理所有 SKU
npx jewelry-listing batch ~/jewelry-listings/

# 输出结构
~/jewelry-listings/output/
├── SKU-001/
│   └── listing.md
├── SKU-002/
│   └── listing.md
└── batch-summary.md  # 批量处理汇总
```

## 图片优化流程

```bash
# 优化图片（调整尺寸、压缩）
npx jewelry-listing images ./SKU-001 \
  --resize 2000x2000 \
  --quality 85 \
  --format jpg

# 输出到 ./SKU-001/images/
```

## 最佳实践

### 1. 拍摄照片

- **光线**: 自然光或柔光箱，避免阴影
- **背景**: 白色/浅色纯色背景
- **角度**: 正面、侧面、背面、细节
- **道具**: 首饰盒、模特佩戴、尺寸对比

### 2. 编写描述

- **第一段**: 吸引注意力的亮点
- **中间**: 详细规格和材质
- **结尾**: 包装、配送、保养

### 3. 选择标签

- 使用 Etsy 搜索建议
- 参考竞争对手的标签
- 混合使用宽泛和精准标签

### 4. 定价策略

```
售价 = 成本 × 2.5 ~ 3.0

成本包括:
- 材料成本
- 包装成本
- 运费
- 平台费用（约 10-12%）
- 时间成本
```

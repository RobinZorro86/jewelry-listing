# Image Processing Guide

## 图片要求

### Etsy 官方标准

| 要求 | 标准 |
|------|------|
| 最小尺寸 | 2000 像素（宽或高） |
| 推荐尺寸 | 2000x2000px 或更高 |
| 文件格式 | JPG, PNG |
| 文件大小 | 每张 < 20MB |
| 数量 | 1-10 张 |
| 长宽比 | 正方形（1:1）最佳 |

### 珠宝摄影特殊要求

**主图（第 1 张）**:
- ✅ 白色或浅色背景
- ✅ 商品占据画面 80% 以上
- ✅ 清晰、对焦准确
- ✅ 自然光线或柔光箱

**细节图（第 2-3 张）**:
- ✅ 展示材质纹理
- ✅ 展示刻印/标志
- ✅ 展示扣环/连接处

**佩戴图（第 4-5 张）**:
- ✅ 展示实际上身效果
- ✅ 模特或人体模型
- ✅ 自然姿势

**尺寸对比图（第 6 张）**:
- ✅ 用硬币/尺子对比
- ✅ 清晰展示实际大小

## 图片优化流程

### 使用 CLI 工具

```bash
# 优化单个 SKU 的图片
npx jewelry-listing images ./SKU-001 \
  --resize 2000x2000 \
  --quality 85 \
  --format jpg \
  --background "#FFFFFF"

# 批量优化所有 SKU
npx jewelry-listing images ./ --batch
```

### 输出结构

```
SKU-001/
├── photo_01.jpg           # 原始图片
├── photo_02.jpg
├── ...
└── images/                # 优化后输出
    ├── 01_main.jpg        # 主图（重新命名）
    ├── 02_angle.jpg       # 角度图
    ├── 03_detail.jpg      # 细节图
    ├── 04_wearing.jpg     # 佩戴图
    └── 05_size.jpg        # 尺寸图
```

## 图片处理参数

### 调整尺寸

```json
{
  "width": 2000,
  "height": 2000,
  "fit": "contain",
  "background": "#FFFFFF"
}
```

**fit 选项**:
- `contain`: 保持比例，留白填充（推荐）
- `cover`: 裁剪填充
- `fill`: 拉伸填充（不推荐）
- `inside`: 缩小到内部

### 压缩质量

| 质量值 | 文件大小 | 适用场景 |
|--------|----------|----------|
| 90-95 | 大 | 高端珠宝，需要极致细节 |
| 80-89 | 中 | 日常使用（推荐） |
| 70-79 | 小 | 快速加载，网络传输 |

### 背景处理

**白色背景**:
```bash
--background "#FFFFFF"
```

**透明背景**（PNG）:
```bash
--background "transparent" --format png
```

**保留原背景**:
```bash
--background "none"
```

## 拍摄技巧

### 光线设置

**自然光**:
- 时间：上午 10 点 - 下午 2 点
- 位置：靠近窗户，避免直射阳光
- 反射：使用白色卡纸补光

**人工光**:
- 主光：柔光箱，45 度角
- 补光：白色反光板
- 背光：突出轮廓（可选）

### 背景选择

| 背景类型 | 适用商品 | 效果 |
|----------|----------|------|
| 白色亚克力 | 所有珠宝 | 干净、专业 |
| 灰色绒布 | 金银饰品 | 高级感 |
| 大理石纹 | 高端珠宝 | 奢华感 |
| 木质 | 复古/手工 | 温暖感 |
| 模特佩戴 | 所有 | 展示效果 |

### 道具使用

**推荐道具**:
- 白色/灰色卡纸
- 亚克力展示台
- 人体模型（颈部/手部）
- 硬币（尺寸对比）
- 鲜花/绿植（场景搭配）

**避免**:
- 过于花哨的背景
- 反光强烈的表面
- 颜色冲突的道具

## 常见问题

### 图片模糊

**原因**:
- 对焦不准确
- 手抖动
- 光线不足导致快门慢

**解决**:
- 使用三脚架
- 增加光线
- 使用定时拍摄或遥控器

### 颜色偏差

**原因**:
- 白平衡设置错误
- 光线色温影响

**解决**:
- 使用灰卡校准白平衡
- 后期调整色温
- 保持拍摄环境光线一致

### 反光问题

**原因**:
- 金属/宝石反光
- 光线角度不当

**解决**:
- 使用柔光箱
- 调整光线角度（偏振光）
- 使用偏振镜（CPL）

### 阴影过重

**原因**:
- 单侧光源
- 光线太硬

**解决**:
- 增加补光
- 使用反光板
- 柔化主光源

## 后期处理

### 基础调整

1. **裁剪**: 正方形构图，商品居中
2. **亮度**: 提亮整体画面
3. **对比度**: 适度增加
4. **白平衡**: 校正色偏
5. **锐化**: 增强细节

### 进阶处理

1. **去瑕疵**: 去除灰尘、指纹
2. **背景净化**: 统一背景色
3. **颜色增强**: 突出宝石色彩
4. **阴影柔化**: 减轻硬阴影

### 推荐工具

**免费**:
- GIMP
- Photopea（在线）
- RawTherapee

**付费**:
- Adobe Photoshop
- Adobe Lightroom
- Capture One

## 批量处理脚本

### Node.js 示例

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImages(inputDir, outputDir) {
  const files = fs.readdirSync(inputDir)
    .filter(f => f.match(/\.(jpg|png)$/i));

  for (const [index, file] of files.entries()) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, `${String(index + 1).padStart(2, '0')}_${getRole(index)}.jpg`);

    await sharp(inputPath)
      .resize(2000, 2000, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    console.log(`Processed: ${file} → ${path.basename(outputPath)}`);
  }
}

function getRole(index) {
  const roles = ['main', 'angle', 'detail', 'wearing', 'size', 'packaging'];
  return roles[index] || 'extra';
}
```

## 检查清单

上传前检查：

- [ ] 至少 3 张图片
- [ ] 主图是正方形（1:1）
- [ ] 图片清晰、对焦准确
- [ ] 光线均匀，无过重阴影
- [ ] 背景干净（主图白底）
- [ ] 文件大小 < 20MB
- [ ] 格式为 JPG 或 PNG
- [ ] 包含细节图和佩戴图
- [ ] 颜色真实，无色偏
- [ ] 已去除灰尘、指纹

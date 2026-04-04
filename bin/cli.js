#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');
const sharp = require('sharp');

const version = '3.0.0';

// 主命令
program
  .name('jewelry-listing')
  .description('珠宝 Listing 自动化工具 - Jewelry Listing Automation for Etsy')
  .version(version);

// process 命令
program
  .command('process <skuFolder>')
  .description('处理单个 SKU 文件夹')
  .option('-o, --output <dir>', '输出目录', './output')
  .option('-v, --verbose', '详细输出')
  .option('--force', '覆盖已存在的输出目录')
  .action(async (skuFolder, options) => {
    try {
      console.log(`💎 处理 SKU: ${skuFolder}`);
      
      const infoPath = path.join(skuFolder, 'info.md');
      if (!await fs.pathExists(infoPath)) {
        throw new Error('info.md not found in SKU folder');
      }

      // 读取 info.md
      const infoContent = await fs.readFile(infoPath, 'utf8');
      const { data, content } = matter(infoContent);

      // 验证必填字段
      const required = ['sku', 'title', 'category', 'material', 'price', 'currency'];
      for (const field of required) {
        if (!data[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      // 创建输出目录
      const outputDir = path.join(options.output, data.sku);
      if (await fs.pathExists(outputDir)) {
        if (!options.force) {
          throw new Error(`Output directory exists: ${outputDir}. Use --force to overwrite.`);
        }
        await fs.remove(outputDir);
      }
      await fs.ensureDir(outputDir);
      await fs.ensureDir(path.join(outputDir, 'images'));

      // 生成标题
      const title = generateTitle(data);
      await fs.writeFile(path.join(outputDir, 'title.txt'), title);

      // 生成描述
      const description = generateDescription(data, content);
      await fs.writeFile(path.join(outputDir, 'description.md'), description);

      // 生成标签
      const tags = generateTags(data);
      await fs.writeFile(path.join(outputDir, 'tags.txt'), tags.join(', '));

      // 生成属性 JSON
      const attributes = generateAttributes(data);
      await fs.writeFile(
        path.join(outputDir, 'attributes.json'),
        JSON.stringify(attributes, null, 2)
      );

      // 生成完整 listing.md
      const listing = generateListing(data, content, title, tags);
      await fs.writeFile(path.join(outputDir, 'listing.md'), listing);

      // 处理图片
      const images = await processImages(skuFolder, path.join(outputDir, 'images'), options.verbose);
      
      if (options.verbose) {
        console.log(`✅ 处理完成：${data.sku}`);
        console.log(`📁 输出目录：${outputDir}`);
        console.log(`📷 处理图片：${images.length} 张`);
      } else {
        console.log(`✅ ${data.sku} - ${images.length} images`);
      }

    } catch (error) {
      console.error(`❌ 错误：${error.message}`);
      process.exit(1);
    }
  });

// batch 命令
program
  .command('batch <inputDir>')
  .description('批量处理多个 SKU')
  .option('-o, --output <dir>', '输出目录', './output')
  .option('-l, --limit <number>', '限制处理数量')
  .option('-v, --verbose', '详细输出')
  .action(async (inputDir, options) => {
    try {
      console.log(`📦 批量处理：${inputDir}`);
      
      const items = await fs.readdir(inputDir);
      const skuFolders = [];

      for (const item of items) {
        const itemPath = path.join(inputDir, item);
        const stat = await fs.stat(itemPath);
        if (stat.isDirectory()) {
          const infoPath = path.join(itemPath, 'info.md');
          if (await fs.pathExists(infoPath)) {
            skuFolders.push(itemPath);
          }
        }
      }

      if (skuFolders.length === 0) {
        throw new Error('No SKU folders found');
      }

      const limit = options.limit ? parseInt(options.limit) : skuFolders.length;
      const processed = [];
      const failed = [];

      for (let i = 0; i < Math.min(limit, skuFolders.length); i++) {
        const skuFolder = skuFolders[i];
        try {
          // 模拟 process 命令的核心逻辑
          const infoPath = path.join(skuFolder, 'info.md');
          const infoContent = await fs.readFile(infoPath, 'utf8');
          const { data } = matter(infoContent);
          
          const outputDir = path.join(options.output, data.sku);
          await fs.ensureDir(outputDir);
          await fs.ensureDir(path.join(outputDir, 'images'));
          
          // 简化处理：只复制 info.md 和基础文件
          await fs.copy(infoPath, path.join(outputDir, 'info.md'));
          
          processed.push(data.sku);
          console.log(`✅ ${data.sku}`);
        } catch (error) {
          failed.push({ sku: path.basename(skuFolder), error: error.message });
          console.error(`❌ ${path.basename(skuFolder)}: ${error.message}`);
        }
      }

      // 生成汇总报告
      const summary = generateBatchSummary(processed, failed, new Date().toISOString());
      await fs.writeFile(path.join(options.output, 'batch-summary.md'), summary);

      console.log(`\n📊 汇总：${processed.length} 成功，${failed.length} 失败`);
      console.log(`📁 输出目录：${options.output}`);
      console.log(`📄 汇总报告：${path.join(options.output, 'batch-summary.md')}`);

    } catch (error) {
      console.error(`❌ 错误：${error.message}`);
      process.exit(1);
    }
  });

// images 命令
program
  .command('images <skuFolder>')
  .description('优化 SKU 图片')
  .option('--resize <WxH>', '调整尺寸', '2000x2000')
  .option('--quality <1-100>', 'JPEG 质量', '85')
  .option('--format <jpg|png>', '输出格式', 'jpg')
  .option('--background <color>', '背景色', '#FFFFFF')
  .option('-o, --output <dir>', '输出目录')
  .action(async (skuFolder, options) => {
    try {
      console.log(`📷 优化图片：${skuFolder}`);
      
      const outputDir = options.output || path.join(skuFolder, 'images');
      await fs.ensureDir(outputDir);

      const [width, height] = options.resize.split('x').map(Number);
      const quality = parseInt(options.quality);
      
      const images = await processImages(skuFolder, outputDir, true, {
        width,
        height,
        quality,
        format: options.format,
        background: options.background
      });

      console.log(`✅ 处理完成：${images.length} 张图片`);
      console.log(`📁 输出目录：${outputDir}`);

    } catch (error) {
      console.error(`❌ 错误：${error.message}`);
      process.exit(1);
    }
  });

program.parse();

// 辅助函数

function generateTitle(data) {
  const parts = [
    ...(data.material || []).slice(0, 2),
    data.category,
    ...(data.style || []).slice(0, 2),
    ...(data.occasion || []).slice(0, 1),
    'Jewelry'
  ];
  return parts.join(' ').slice(0, 140);
}

function generateDescription(data, content) {
  return content || `## ${data.title}\n\n${(data.material || []).join(', ')} 材质的精美珠宝。`;
}

function generateTags(data) {
  const tags = [];
  
  // 商品类型
  tags.push(data.category, `${data.category} jewelry`, 'jewelry');
  
  // 材质
  (data.material || []).forEach(m => {
    tags.push(m.toLowerCase().replace(' ', '-'));
  });
  
  // 风格
  (data.style || []).forEach(s => {
    tags.push(s.toLowerCase());
  });
  
  // 场景
  (data.occasion || []).forEach(o => {
    tags.push(`${o.toLowerCase()}-wear`);
  });
  
  // 填充到 13 个
  while (tags.length < 13) {
    tags.push('gift');
  }
  
  return tags.slice(0, 13);
}

function generateAttributes(data) {
  return {
    sku: data.sku,
    title: data.title,
    category: {
      main: 'Jewelry',
      sub: getCategorySub(data.category),
      specific: data.category
    },
    materials: {
      primary: (data.material || [])[0] || '',
      secondary: (data.material || [])[1] || '',
      details: (data.material || []).join(', ')
    },
    dimensions: data.dimensions || {},
    style: data.style || [],
    occasion: data.occasion || [],
    condition: data.condition || 'new',
    made_to_order: data.made_to_order || false,
    processing_time: data.processing_time || '1-3 business days',
    price: {
      amount: data.price,
      currency: data.currency
    }
  };
}

function getCategorySub(category) {
  const map = {
    necklace: 'Necklaces',
    earrings: 'Earrings',
    ring: 'Rings',
    bracelet: 'Bracelets',
    pendant: 'Pendants',
    brooch: 'Brooches',
    set: 'Jewelry Sets'
  };
  return map[category] || 'Jewelry';
}

function generateListing(data, content, title, tags) {
  return `---
sku: ${data.sku}
title: ${title}
price: ${data.price}
currency: ${data.currency}
category: Jewelry → ${getCategorySub(data.category)}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
---
${content}
`;
}

async function processImages(skuFolder, outputDir, verbose = false, options = {}) {
  const files = await fs.readdir(skuFolder);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f)).sort();
  
  const processed = [];
  const roles = ['main', 'angle', 'detail', 'wearing', 'size', 'packaging', 'extra'];
  
  for (const [index, file] of imageFiles.entries()) {
    const inputPath = path.join(skuFolder, file);
    const outputName = `${String(index + 1).padStart(2, '0')}_${roles[index] || 'extra'}.${options.format || 'jpg'}`;
    const outputPath = path.join(outputDir, outputName);
    
    const resizeOptions = options.width ? { width: options.width, height: options.height } : { width: 2000, height: 2000 };
    
    await sharp(inputPath)
      .resize(resizeOptions.width, resizeOptions.height, {
        fit: 'contain',
        background: hexToRgb(options.background || '#FFFFFF')
      })
      .jpeg({ quality: options.quality || 85 })
      .toFile(outputPath);
    
    processed.push(outputName);
    if (verbose) {
      console.log(`  📷 ${file} → ${outputName}`);
    }
  }
  
  return processed;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    alpha: 1
  } : { r: 255, g: 255, b: 255, alpha: 1 };
}

function generateBatchSummary(processed, failed, timestamp) {
  return `# Batch Processing Summary

**Date**: ${timestamp}
**Total Processed**: ${processed.length}
**Failed**: ${failed.length}

## ✅ Successful

${processed.map(sku => `- ${sku}`).join('\n')}

## ❌ Failed

${failed.length > 0 ? failed.map(f => `- ${f.sku}: ${f.error}`).join('\n') : 'None'}
`;
}

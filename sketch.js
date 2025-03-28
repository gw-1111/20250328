let angleOffset = 0;
let seaweeds = []; // 儲存水草屬性的陣列
let bubbles = []; // 儲存泡泡屬性的陣列

function setup() {
  // 設定透明背景的畫布
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('z-index', '1'); // 設定畫布的 z-index 為 1，讓其位於 iframe 上層
  canvas.style('pointer-events', 'none'); // 禁用畫布的滑鼠事件，讓 iframe 可正常操作

  // 設定 body 的背景顏色
  document.body.style.backgroundColor = '#caf0f8';

  // 創建 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('width', '60%');
  iframe.style('height', '60%');
  iframe.style('top', '20%'); // 垂直居中
  iframe.style('left', '20%'); // 水平居中
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('z-index', '0'); // 設定 iframe 的 z-index 為 0，讓其位於畫布下層

  let numSeaweeds = 60; // 水草數量調整為 60
  let colors = ['#c9e4ca', '#87bba2', '#55828b', '#3b6064', '#364958']; // 水草顏色範圍

  for (let i = 0; i < numSeaweeds; i++) {
    seaweeds.push({
      baseX: map(i, 0, numSeaweeds - 1, 0, width), // 水草的水平位置
      height: random(100, 250), // 水草的高度
      color: color(random(colors) + '80'), // 隨機選擇顏色並加入透明度 (80 表示約 50% 透明)
      thickness: random(5, 15), // 水草的粗細
      frequency: random(0.05, 0.15) // 水草的搖晃頻率 (降低範圍)
    });
  }
}

function draw() {
  clear(); // 清除畫布，確保背景透明

  blendMode(BLEND); // 啟用 BLEND 模式，讓顏色可以重疊並產生透明效果

  // 繪製水草
  for (let i = 0; i < seaweeds.length; i++) {
    let seaweed = seaweeds[i];

    strokeWeight(seaweed.thickness);
    stroke(seaweed.color);
    noFill();

    beginShape();
    for (let y = 0; y > -seaweed.height; y -= 10) {
      let sway = sin(angleOffset + y * seaweed.frequency) * map(y, 0, -seaweed.height, 2, 10);
      curveVertex(seaweed.baseX + sway, height + y); // 使用 curveVertex 繪製平滑曲線
    }
    endShape();
  }

  // 更新泡泡
  for (let i = bubbles.length - 1; i >= 0; i--) {
    let bubble = bubbles[i];
    bubble.y -= bubble.speed; // 泡泡向上移動

    // 繪製泡泡
    noStroke();
    fill('#f2f2f2');
    ellipse(bubble.x, bubble.y, bubble.size);

    // 如果泡泡到達一半高度，移除它
    if (bubble.y < height / 2) {
      bubbles.splice(i, 1); // 移除泡泡
    }
  }

  // 隨機生成新泡泡
  if (random(1) < 0.05) {
    bubbles.push({
      x: random(width), // 泡泡的水平位置
      y: height, // 泡泡從底部生成
      size: random(10, 30), // 泡泡大小
      speed: random(1, 3) // 泡泡上升速度
    });
  }

  angleOffset += 0.01; // 減慢整體搖晃速度
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小

  // 重新計算水草的水平位置
  for (let i = 0; i < seaweeds.length; i++) {
    seaweeds[i].baseX = map(i, 0, seaweeds.length - 1, 0, width);
  }
}


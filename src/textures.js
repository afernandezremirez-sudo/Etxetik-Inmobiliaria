import * as THREE from 'three';

function drawHouseIcon(ctx, x, y, size, color = '#ffffff', lineWidth = 4) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const w = size;
  const h = size * 0.85;

  ctx.beginPath();
  ctx.moveTo(x - w * 0.55, y - h * 0.05);
  ctx.lineTo(x, y - h * 0.55);
  ctx.lineTo(x + w * 0.55, y - h * 0.05);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - w * 0.38, y - h * 0.12);
  ctx.lineTo(x - w * 0.38, y + h * 0.42);
  ctx.lineTo(x + w * 0.38, y + h * 0.42);
  ctx.lineTo(x + w * 0.38, y - h * 0.12);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(x - w * 0.11, y + h * 0.12, w * 0.22, h * 0.3);
  ctx.stroke();

  ctx.restore();
}

export function createHeaderTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0c1b2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawHouseIcon(ctx, 290, 182, 125, '#ffffff', 9);

  ctx.fillStyle = '#ffffff';
  ctx.font = '600 124px "Segoe UI", Arial, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText('ETXETIK INMOBILIARIA', 395, 190);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function createPropertyCardTexture(item, index) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 460;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const photoX = 24;
  const photoY = 24;
  const photoW = canvas.width - 48;
  const photoH = 295;

  const skyGrads = [
    ['#4f7cac', '#cbd5e1'],
    ['#3b6998', '#e2e8f0'],
    ['#64748b', '#f1f5f9'],
    ['#d97706', '#fef3c7'],
    ['#475569', '#cbd5e1'],
    ['#9a3412', '#ffedd5']
  ];
  const [c1, c2] = skyGrads[index % skyGrads.length];
  const bg = ctx.createLinearGradient(0, photoY, 0, photoY + photoH);
  bg.addColorStop(0, c1);
  bg.addColorStop(1, c2);
  ctx.fillStyle = bg;
  ctx.fillRect(photoX, photoY, photoW, photoH);

  ctx.fillStyle = index % 2 === 0 ? '#f8fafc' : '#334155';
  ctx.fillRect(photoX + 90, photoY + 95, 410, 175);
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(photoX + 70, photoY + 95);
  ctx.lineTo(photoX + 295, photoY + 35);
  ctx.lineTo(photoX + 520, photoY + 95);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fde68a';
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      ctx.fillRect(photoX + 125 + col * 92, photoY + 120 + row * 68, 56, 44);
    }
  }

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(24, 325, canvas.width - 48, 112);

  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.font = '700 31px "Segoe UI", Arial, sans-serif';
  ctx.fillText(`${item.title} · ${item.price}`, canvas.width / 2, 372);

  ctx.fillStyle = '#334155';
  ctx.font = '500 27px "Segoe UI", Arial, sans-serif';
  ctx.fillText(`${item.area} · ${item.rooms} · ${item.baths}`, canvas.width / 2, 414);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function createLeftVinylTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 650;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(220, 230, 240, 0.32)';
  ctx.fillRect(0, 40, canvas.width, 165);

  drawHouseIcon(ctx, 520, 122, 85, '#1e293b', 7);
  ctx.fillStyle = '#1e293b';
  ctx.font = '700 84px "Segoe UI", Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('ETXETIK', 590, 126);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0,0,0,0.65)';
  ctx.shadowBlur = 10;
  ctx.font = '600 66px "Segoe UI", Arial, sans-serif';
  ctx.fillText('Zure hurrengo etxea,', canvas.width / 2, 285);
  ctx.fillText('gure konpromisoa', canvas.width / 2, 360);

  ctx.font = '500 40px "Segoe UI", Arial, sans-serif';
  ctx.fillText('644 27 00 17 · etxetikinmobiliaria@etxetik.com', canvas.width / 2, 455);
  ctx.font = '400 37px "Segoe UI", Arial, sans-serif';
  ctx.fillText('Astelehenetik ostiralera: 9:30–13:30 / 16:00–19:30', canvas.width / 2, 515);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createRightServicesTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 1200;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.shadowColor = 'rgba(0,0,0,0.7)';
  ctx.shadowBlur = 8;

  const services = [
    { label: 'Erosketa', sub: '', y: 240, icon: 'house' },
    { label: 'Salmenta', sub: '', y: 400, icon: 'deal' },
    { label: 'Alokairua', sub: '', y: 560, icon: 'key' },
    { label: 'Aholkularitza', sub: 'pertsonalizatua', y: 740, icon: 'chart' },
    { label: 'Doan baloratzen dugu', sub: 'zure etxebizitza', y: 960, icon: 'hand' }
  ];

  services.forEach((s) => {
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 6;

    if (s.icon === 'house') {
      drawHouseIcon(ctx, 160, s.y, 85, '#ffffff', 6);
    } else if (s.icon === 'deal') {
      ctx.beginPath();
      ctx.arc(160, s.y, 34, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(135, s.y);
      ctx.lineTo(185, s.y);
      ctx.stroke();
    } else if (s.icon === 'key') {
      ctx.beginPath();
      ctx.arc(178, s.y - 14, 20, 0, Math.PI * 2);
      ctx.moveTo(164, s.y);
      ctx.lineTo(130, s.y + 34);
      ctx.lineTo(146, s.y + 34);
      ctx.stroke();
    } else if (s.icon === 'chart') {
      ctx.strokeRect(126, s.y + 8, 16, 28);
      ctx.strokeRect(152, s.y - 8, 16, 44);
      ctx.strokeRect(178, s.y - 26, 16, 62);
    } else if (s.icon === 'hand') {
      ctx.beginPath();
      ctx.arc(155, s.y - 10, 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(155, s.y + 10, 14, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    if (!s.sub) {
      ctx.font = '600 62px "Segoe UI", Arial, sans-serif';
      ctx.fillText(s.label, 240, s.y);
    } else {
      ctx.font = '600 50px "Segoe UI", Arial, sans-serif';
      ctx.fillText(s.label, 240, s.y - 22);
      ctx.font = '400 44px "Segoe UI", Arial, sans-serif';
      ctx.fillText(s.sub, 240, s.y + 30);
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

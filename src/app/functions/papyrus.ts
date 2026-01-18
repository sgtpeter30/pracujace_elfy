// export function drawPapyrus(canvas: HTMLCanvasElement) {
//   const ctx = canvas.getContext('2d');
//   // Bazowy kolor papirusu
//   const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//   gradient.addColorStop(0, '#f4e8d0');
//   gradient.addColorStop(0.3, '#e8d5b7');
//   gradient.addColorStop(0.7, '#d9c4a8');
//   gradient.addColorStop(1, '#c9b298');
//   ctx.fillStyle = gradient;
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   // Tekstura włókien
//   for (let i = 0; i < 3000; i++) {
//     const x = Math.random() * canvas.width;
//     const y = Math.random() * canvas.height;
//     const length = Math.random() * 15 + 5;
//     const angle = Math.random() * Math.PI;
//     const opacity = Math.random() * 0.15;

//     ctx.strokeStyle = `rgba(139, 119, 101, ${opacity})`;
//     ctx.lineWidth = 0.5;
//     ctx.beginPath();
//     ctx.moveTo(x, y);
//     ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
//     ctx.stroke();
//   }

//   // Plamy i zestarzenia
//   for (let i = 0; i < 30; i++) {
//     const x = Math.random() * canvas.width;
//     const y = Math.random() * canvas.height;
//     const radius = Math.random() * 40 + 10;
//     const opacity = Math.random() * 0.1 + 0.05;

//     const stainGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
//     stainGradient.addColorStop(0, `rgba(101, 67, 33, ${opacity})`);
//     stainGradient.addColorStop(1, 'rgba(101, 67, 33, 0)');
//     ctx.fillStyle = stainGradient;
//     ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
//   }

//   // Większe plamy
//   for (let i = 0; i < 8; i++) {
//     const x = Math.random() * canvas.width;
//     const y = Math.random() * canvas.height;
//     const radius = Math.random() * 60 + 30;
//     const opacity = Math.random() * 0.08 + 0.03;

//     const bigStainGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
//     bigStainGradient.addColorStop(0, `rgba(120, 90, 60, ${opacity})`);
//     bigStainGradient.addColorStop(1, 'rgba(120, 90, 60, 0)');
//     ctx.fillStyle = bigStainGradient;
//     ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
//   }

//   // Ciemniejsze krawędzie (efekt zestarzenia)
//   const edgeGradientTop = ctx.createLinearGradient(0, 0, 0, 100);
//   edgeGradientTop.addColorStop(0, 'rgba(101, 67, 33, 0.15)');
//   edgeGradientTop.addColorStop(1, 'rgba(101, 67, 33, 0)');
//   ctx.fillStyle = edgeGradientTop;
//   ctx.fillRect(0, 0, canvas.width, 100);

//   const edgeGradientBottom = ctx.createLinearGradient(0, canvas.height - 100, 0, canvas.height);
//   edgeGradientBottom.addColorStop(0, 'rgba(101, 67, 33, 0)');
//   edgeGradientBottom.addColorStop(1, 'rgba(101, 67, 33, 0.15)');
//   ctx.fillStyle = edgeGradientBottom;
//   ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

//   const edgeGradientLeft = ctx.createLinearGradient(0, 0, 80, 0);
//   edgeGradientLeft.addColorStop(0, 'rgba(101, 67, 33, 0.15)');
//   edgeGradientLeft.addColorStop(1, 'rgba(101, 67, 33, 0)');
//   ctx.fillStyle = edgeGradientLeft;
//   ctx.fillRect(0, 0, 80, canvas.height);

//   const edgeGradientRight = ctx.createLinearGradient(canvas.width - 80, 0, canvas.width, 0);
//   edgeGradientRight.addColorStop(0, 'rgba(101, 67, 33, 0)');
//   edgeGradientRight.addColorStop(1, 'rgba(101, 67, 33, 0.15)');
//   ctx.fillStyle = edgeGradientRight;
//   ctx.fillRect(canvas.width - 80, 0, 80, canvas.height);

//   // Postrzępione krawędzie
//   ctx.globalCompositeOperation = 'destination-out';
//   for (let i = 0; i < 100; i++) {
//     // Górna krawędź
//     const topX = Math.random() * canvas.width;
//     const topSize = Math.random() * 3 + 1;
//     ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3})`;
//     ctx.fillRect(topX, 0, topSize, Math.random() * 15);

//     // Dolna krawędź
//     const bottomX = Math.random() * canvas.width;
//     const bottomSize = Math.random() * 3 + 1;
//     ctx.fillRect(bottomX, canvas.height - Math.random() * 15, bottomSize, 15);

//     // Lewa krawędź
//     const leftY = Math.random() * canvas.height;
//     const leftSize = Math.random() * 3 + 1;
//     ctx.fillRect(0, leftY, Math.random() * 15, leftSize);

//     // Prawa krawędź
//     const rightY = Math.random() * canvas.height;
//     const rightSize = Math.random() * 3 + 1;
//     ctx.fillRect(canvas.width - Math.random() * 15, rightY, 15, rightSize);
//   }
//   ctx.globalCompositeOperation = 'source-over';
// }

export function drawPapyrus(canvas: HTMLCanvasElement) {
  // Ustawienia canvas
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');
  // Nieregularne krawędzie - kształt papirusu
  ctx.beginPath();

  // Górna krawędź
  ctx.moveTo(20, 10);
  for (let x = 20; x < canvas.width - 20; x += 10) {
    const y = 10 + Math.random() * 8 - 4 + Math.sin(x * 0.05) * 5;
    ctx.lineTo(x, y);
  }

  // Prawa krawędź
  for (let y = 10; y < canvas.height - 20; y += 10) {
    const x = canvas.width - 20 + Math.random() * 8 - 4 + Math.cos(y * 0.03) * 5;
    ctx.lineTo(x, y);
  }

  // Dolna krawędź
  for (let x = canvas.width - 20; x > 20; x -= 10) {
    const y = canvas.height - 20 + Math.random() * 8 - 4 + Math.sin(x * 0.04) * 5;
    ctx.lineTo(x, y);
  }

  // Lewa krawędź
  for (let y = canvas.height - 20; y > 10; y -= 10) {
    const x = 20 + Math.random() * 8 - 4 + Math.cos(y * 0.035) * 5;
    ctx.lineTo(x, y);
  }

  ctx.closePath();
  ctx.clip();

  // Bazowy kolor papirusu
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#f4e8d0');
  gradient.addColorStop(0.3, '#e8d5b7');
  gradient.addColorStop(0.7, '#d9c4a8');
  gradient.addColorStop(1, '#c9b298');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Tekstura włókien
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const length = Math.random() * 15 + 5;
    const angle = Math.random() * Math.PI;
    const opacity = Math.random() * 0.15;

    ctx.strokeStyle = `rgba(139, 119, 101, ${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }

  // Plamy i zestarzenia
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 40 + 10;
    const opacity = Math.random() * 0.1 + 0.05;

    const stainGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    stainGradient.addColorStop(0, `rgba(101, 67, 33, ${opacity})`);
    stainGradient.addColorStop(1, 'rgba(101, 67, 33, 0)');
    ctx.fillStyle = stainGradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  // Większe plamy
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 60 + 30;
    const opacity = Math.random() * 0.08 + 0.03;

    const bigStainGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    bigStainGradient.addColorStop(0, `rgba(120, 90, 60, ${opacity})`);
    bigStainGradient.addColorStop(1, 'rgba(120, 90, 60, 0)');
    ctx.fillStyle = bigStainGradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  // Ciemniejsze krawędzie (efekt zestarzenia)
  const edgeGradientTop = ctx.createLinearGradient(0, 0, 0, 100);
  edgeGradientTop.addColorStop(0, 'rgba(101, 67, 33, 0.15)');
  edgeGradientTop.addColorStop(1, 'rgba(101, 67, 33, 0)');
  ctx.fillStyle = edgeGradientTop;
  ctx.fillRect(0, 0, canvas.width, 100);

  const edgeGradientBottom = ctx.createLinearGradient(0, canvas.height - 100, 0, canvas.height);
  edgeGradientBottom.addColorStop(0, 'rgba(101, 67, 33, 0)');
  edgeGradientBottom.addColorStop(1, 'rgba(101, 67, 33, 0.15)');
  ctx.fillStyle = edgeGradientBottom;
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

  const edgeGradientLeft = ctx.createLinearGradient(0, 0, 80, 0);
  edgeGradientLeft.addColorStop(0, 'rgba(101, 67, 33, 0.15)');
  edgeGradientLeft.addColorStop(1, 'rgba(101, 67, 33, 0)');
  ctx.fillStyle = edgeGradientLeft;
  ctx.fillRect(0, 0, 80, canvas.height);

  const edgeGradientRight = ctx.createLinearGradient(canvas.width - 80, 0, canvas.width, 0);
  edgeGradientRight.addColorStop(0, 'rgba(101, 67, 33, 0)');
  edgeGradientRight.addColorStop(1, 'rgba(101, 67, 33, 0.15)');
  ctx.fillStyle = edgeGradientRight;
  ctx.fillRect(canvas.width - 80, 0, 80, canvas.height);

  // Postrzępione krawędzie
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 100; i++) {
    // Górna krawędź
    const topX = Math.random() * canvas.width;
    const topSize = Math.random() * 3 + 1;
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3})`;
    ctx.fillRect(topX, 0, topSize, Math.random() * 15);

    // Dolna krawędź
    const bottomX = Math.random() * canvas.width;
    const bottomSize = Math.random() * 3 + 1;
    ctx.fillRect(bottomX, canvas.height - Math.random() * 15, bottomSize, 15);

    // Lewa krawędź
    const leftY = Math.random() * canvas.height;
    const leftSize = Math.random() * 3 + 1;
    ctx.fillRect(0, leftY, Math.random() * 15, leftSize);

    // Prawa krawędź
    const rightY = Math.random() * canvas.height;
    const rightSize = Math.random() * 3 + 1;
    ctx.fillRect(canvas.width - Math.random() * 15, rightY, 15, rightSize);
  }
  ctx.globalCompositeOperation = 'source-over';
}
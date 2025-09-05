document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('bottomTextPath').textContent = document.getElementById('textInput').value.toUpperCase();
    document.getElementById("downloadLinkPng").style.display = 'none';
  });
});

function getSvgUrl() {
  const obj = document.getElementById("badge").outerHTML;
  console.log(obj);
  const blob = new Blob([obj], { type: 'image/svg+xml' });
  let url = URL.createObjectURL(blob);
  return url;
}

function updateDownloadLink() {
  const url = getSvgUrl()
  document.getElementById("downloadLink").href = url;
}

function svgToPng() {
  const svg = document.getElementById("badge").outerHTML;
  svg2png(svg, 1000, 1000).then(pngUrl => {
    console.log(pngUrl);
    document.getElementById("downloadLinkPng").href = pngUrl;
    document.getElementById("downloadLinkPng").style.display = 'inline';
  });
}

async function svg2png(svg, width = 1000, height = 1000) {
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  [canvas.width, canvas.height] = [width, height];

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL("image/png");
}
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('bottomTextPath').textContent = document.getElementById('textInput').value.toUpperCase();
    document.getElementById("downloadLinkPng").style.display = 'none';
  });
  const btn = document.getElementById("generateButton")
    btn.addEventListener('click', () => {
      const badgeSize = document.querySelector('input[name="badgeSize"]:checked').value;
      svgToPng(badgeSize);
    });
});

function getSvgUrl() {
  const obj = document.getElementById("badge").outerHTML;
  const blob = new Blob([obj], { type: 'image/svg+xml' });
  let url = URL.createObjectURL(blob);
  return url;
}

function updateDownloadLink() {
  const url = getSvgUrl()
  document.getElementById("downloadLink").href = url;
}

function svgToPng(badgeSize) {
  let size = 3000;
  if (badgeSize === "small") {
    size = 600;
  } else if (badgeSize === "medium") {
    size = 900;
  } else if (badgeSize === "large") {
    size = 1500;
  }

  const svg = document.getElementById("badge").outerHTML;
  svg2png(svg, size, size).then(pngUrl => {
    console.log(pngUrl);
    document.getElementById("downloadLinkPng").href = pngUrl;
    document.getElementById("downloadLinkPng").style.display = 'inline';
  });
}

async function svg2png(svg, width = 1000, height = 1000) {
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  // Wait for the image to load before drawing
  await new Promise((resolve, reject) => {
    img.onload = setTimeout(() => { resolve(); }, 200); // Fallback in case onload doesn't fire;
  });

  const canvas = document.createElement("canvas");
  [canvas.width, canvas.height] = [width, height];

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL("image/png");
}
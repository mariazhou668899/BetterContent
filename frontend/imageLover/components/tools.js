export function  generateHTMLContent(storyData) {
  if (!storyData) {
    return '';
  }

  let storyHTML = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          .container {
            text-align: center;
            font-family: Helvetica Neue;
          }
          .storyTitle {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .storyText {
            font-size: 16px;
            margin-bottom: 15px;
          }
          .storyImage {
            width: 90vw; /* Adjust width as needed */
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="storyTitle">${storyData.title}</div>
  `;

  storyData.storyContent.forEach((paragraph, index) => {
    storyHTML += `
          <div class="storyText">${paragraph}</div>
    `;

    // Check if an image should be inserted
    if (index % Math.ceil(storyData.storyContent.length / storyData.images.length) === 0) {
      const imageIndex = Math.floor(index / Math.ceil(storyData.storyContent.length / storyData.images.length));
      storyHTML += `
          <img src="${storyData.images[imageIndex]}" class="storyImage" />
      `;
    }
  });

  storyHTML += `
        </div>
      </body>
    </html>
  `;

  return storyHTML;
}


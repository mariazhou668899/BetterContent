
export function createStoryPrompt(story) {
    return `
    Create a summary for the following story: ${story}.
    `;
}


export function createImagePrompt(story, imageType = 'illustration image') {
    return `
Give me close ${imageType} for the following story outline: ${story}. 

Do not write any text or speech or words into the images.

`;
}

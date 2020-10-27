export function preloadImage(imagesObject) {
  // eslint-disable-next-line no-unused-vars
  Object.keys(imagesObject).map((key, index) => {
    const img = new Image();
    img.src = imagesObject;
  });
}
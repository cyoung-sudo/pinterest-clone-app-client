//----- Add dimensions to image
export const formatImage = image => {
  return loadImage(image)
  .then(res => {
    // Valid image
    return {
      imageId: image._id,
      url: image.url,
      height: res.naturalHeight,
      width: res.naturalWidth
    };
  })
  .catch(err => {
    // Invalid image
    return {
      imageId: image._id,
      url: image.url,
      height: 100,
      width: 100,
    };
  });
}

//----- Load image given url
const loadImage = image => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = image.url;
  })
}
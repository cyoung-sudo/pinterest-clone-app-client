//----- Format image doc -> HTML image element
export const formatImages = images => {
  let results = [];

  images.forEach(image => {
    let imgObj = new Image();
    imgObj.src = image.url;

    // Check for invalid image urls
    if(imgObj.naturalWidth === 0 || imgObj.naturalHeight === 0) {
      results.push({
        src: "",
        height: 100,
        width: 100,
      });
    } else {
      results.push({
        src: image.url,
        height: imgObj.naturalHeight,
        width: imgObj.naturalWidth,
      });
    }
  });

  return results;
};
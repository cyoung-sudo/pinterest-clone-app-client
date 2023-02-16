import "./ImagesDisplay.css";
// Redux
import { useSelector } from "react-redux";
// Masonry
import Masonry from "react-responsive-masonry"

export default function ImagesDisplay({ images, handleDelete }) {
  // State
  const { authUser }  = useSelector((state) => state.app);

  return (
    <div id="imagesDisplay">
      <Masonry>
        {images.map((image, idx) => (
          <div key={ idx } className="imagesDisplay-image">
            <img
              src={ image.url }
              alt="img"
              height={ image.height }
              width={ image.width }/>
            {authUser && 
              <button onClick={() => handleDelete(image.imageId)}>Delete</button>}
          </div>
        ))}
      </Masonry>
    </div>
  );
};
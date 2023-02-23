import "./ImagesDisplay.css";
// Masonry
import Masonry from "react-responsive-masonry"

export default function ImagesDisplay({ images, user, authUser, handleDelete }) {
  return (
    <div id="imagesDisplay">
      <Masonry columnsCount={2}>
        {images.map((image, idx) => (
          <div key={ idx } className="imagesDisplay-image">
            <img
              src={ image.url }
              alt={ `img${idx}` }
              height={ image.height }
              width={ image.width }/>
            {authUser && (authUser._id === user._id) &&
              <button onClick={() => handleDelete(image.imageId)}>Delete</button>}
          </div>
        ))}
      </Masonry>
    </div>
  );
};
import "./ImagesDisplay.css";
// Grid
import { Gallery } from "react-grid-gallery";

export default function ImagesDisplay({ images }) {
  return (
    <div id="imagesDisplay">
      <Gallery images={images} />
    </div>
  );
};
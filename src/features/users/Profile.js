import "./Profile.css";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { refresh } from "../../appSlice";
import { setPopup } from "../../components/popup/slices/popupSlice";
// Components
import ImageForm from "../../components/forms/ImageForm";
import ImagesDislay from "../../components/displays/ImagesDisplay";
// APIs
import * as authAPI from "../../apis/authAPI";
import * as userAPI from "../../apis/userAPI";
import * as imageAPI from "../../apis/imageAPI";
// Utils
import * as formatData from "../../utils/formatData";

export default function Profile() {
  // Requested data
  const [user, setUser] = useState(null);
  const [images, setImages] = useState(null);
  // Controlled inputs
  const [url, setUrl] = useState("");
  // State
  const { refreshToggle }  = useSelector((state) => state.app);
  // Hooks
  const { id } = useParams();
  const dispatch = useDispatch();

  //----- Retrieve given user on load
  useEffect(() => {
    userAPI.getUser(id)
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
      }
    })
    .catch(err => console.log(err));
  }, []);

  //----- Retrieve images for given user on load
  useEffect(() => {
    // Reset state (loading data)
    setImages(null);

    imageAPI.getForUser(id)
    .then(res => {
      if(res.data.success) {
        // Format images
        let formattedImages = formatData.formatImages(res.data.images);
        setImages(formattedImages);
      }
    })
    .catch(err => console.log(err));
  }, [refreshToggle]);

  //----- Add new image
  const handleSubmit = e => {
    e.preventDefault();

    // Validations
    if(url === "") {
      dispatch(setPopup({
        message: "Missing url",
        type: "error"
      }));
    } else {
      // Check session status
      authAPI.getUser()
      .then(res => {
        if(res.data.success) {
          return imageAPI.create(res.data.user._id, url);
        } else {
          return { message: "Session has expired"};
        }
      })
      .then(res => {
        if(res.message) {
          dispatch(setPopup({
            message: res.message,
            type: "error"
          }));
        } else if(res.data.success) {
          dispatch(setPopup({
            message: "Image created",
            type: "success"
          }));
          dispatch(refresh());
        } else {
          dispatch(setPopup({
            message: res.data.message,
            type: "error"
          }));
        }
      })
      .catch(err => console.log(err));
    }
  };

  if(user && images) {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{ user.username }'s Profile</h1>
        </div>

        <div id="profile-form-wrapper">
          <ImageForm
            setUrl={ setUrl }
            handleSubmit={ handleSubmit }/>
        </div>

        <div id="profile-imagesDisplay-wrapper">
          <ImagesDislay
            images={ images }/>
        </div>
      </div>
    );
  }
};
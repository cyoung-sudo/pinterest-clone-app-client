import "./Profile.css";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams, useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, refresh } from "../../appSlice";
import { setPopup } from "../../components/popup/slices/popupSlice";
// Components
import ImageForm from "../../components/forms/ImageForm";
import ImagesDislay from "../../components/displays/ImagesDisplay";
// APIs
import * as authAPI from "../../apis/authAPI";
import * as userAPI from "../../apis/userAPI";
import * as imageAPI from "../../apis/imageAPI";
// Utils
import * as imageUtils from "../../utils/imageUtils";

export default function Profile() {
  // Requested data
  const [user, setUser] = useState(null);
  const [images, setImages] = useState(null);
  // Controlled inputs
  const [url, setUrl] = useState("");
  // State
  const { authUser, refreshToggle }  = useSelector((state) => state.app);
  // Hooks
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    .then(async res => {
      if(res.data.success) {
        // Format images
        let formattedImages = [];
        for(let image of res.data.images) {
          formattedImages.push(await imageUtils.formatImage(image));
        }
        
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
        message: "Missing required information",
        type: "error"
      }));
    } else {
      // Check session status
      authAPI.getUser()
      .then(res => {
        if(res.data.success) {
          // Create image
          imageAPI.create(res.data.user._id, url)
          .then(res2 => {
            if(res2.data.success) {
              dispatch(setPopup({
                message: "Added image",
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
        } else {
          // Expired session
          expiredSession();
        }
      })
      .catch(err => console.log(err));
    }
  };

  //----- Delete given image
  const handleDelete = imageId => {
    // Check session status
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        // Delete image
        imageAPI.deleteImage(imageId)
        .then(res2 => {
          if(res2.data.success) {
            dispatch(setPopup({
              message: "Removed image",
              type: "success"
            }));
            dispatch(refresh());
          }
        })
        .catch(err => console.log(err));
      } else {
        // Expired session
        expiredSession();
      }
    })
    .catch(err => console.log(err));
  };

  //----- Handle expired sessions
  const expiredSession = () => {
    dispatch(setAuthUser(null));
    dispatch(setPopup({
      message: "Session has expired",
      type: "error"
    }));

    // Redirect to home page
    navigate("/");
  };

  if(user && images) {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{ user.username }'s Profile</h1>
        </div>

        {authUser && (authUser._id === user._id) && 
          <div id="profile-form-wrapper">
            <ImageForm
              setUrl={ setUrl }
              handleSubmit={ handleSubmit }/>
          </div>
        }

        <div id="profile-imagesDisplay-wrapper">
          <ImagesDislay
            images={ images }
            user={ user }
            handleDelete={ handleDelete }/>
        </div>
      </div>
    );
  }
};
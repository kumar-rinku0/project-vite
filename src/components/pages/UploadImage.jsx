import { useState } from "react";
import axios from "axios";
import { Button } from "@components/components/ui/button";
import { Input } from "@components/components/ui/input";
import base64Decode from "fast-base64-decode";

const UploadImage = ({ orgId, inputs, setInputs, qrImage, setQrImage }) => {
  const [loading, setLoading] = useState(false);
  const [newImg, setNewImg] = useState(null);
  const handleChange = (event) => {
    const { name } = event.target;
    if (name === "image") {
      setQrImage(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };
  const handleSubmitImg = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(inputs);
    axios
      .post(
        `/api/v1/events/uploadImage/userId/${orgId}`,
        { image: qrImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setNewImg(res.data.data.image);
      })
      .catch((err) => console.log("image", err))
      .finally(() => {
        setLoading(false);
      });
  };
  const base64ToImage = (base64String, imgElementId) => {
    var img = new Image();
    img.src = "data:image/jpeg;base64," + base64String;
    var imgElement = document.getElementById(imgElementId);
    imgElement.src = img.src;
  };
  return (
    <div>
      <div>
        <label htmlFor="image" className="text-sm">
          Image
        </label>
        <div className="flex gap-4">
          <Input
            type="file"
            name="image"
            id="image"
            className="w-56"
            onChange={handleChange}
            // value={inputs.image || ""}
          />
          <Button type="button" onClick={handleSubmitImg} disabled={loading}>
            Upload
          </Button>
        </div>
        {newImg && (
          <div>
            <div>uploaded img</div>
            <img
              src={base64Decode(newImg, new Uint8Array(newImg.length))}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;

import { useState } from "react";
import axios from "axios";
import { Button } from "@components/components/ui/button";
import { Input } from "@components/components/ui/input";
import { FaCheck } from "react-icons/fa";

const UploadImage = ({
  orgId,
  eventId,
  edit,
  inputs,
  setInputs,
  qrImage,
  setQrImage,
  newImg,
  setNewImg,
  setNewEventId,
}) => {
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setQrImage(event.target.files[0]);
      console.log(event.target.files[0]);
    }
    setInputs((values) => ({ ...values, [name]: value }));
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
        setNewEventId(res.data.data.id);
        setNewImg(res.data.data.image);
      })
      .catch((err) => {
        console.log("image", err);
        setLoading(false);
      });
  };

  const handleSubmitEditImg = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(inputs);
    axios
      .post(
        `/api/v1/events/uploadImage/userId/${orgId}/eventId/${eventId}`,
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
        setLoading(false);
      })
      .catch((err) => {
        console.log("image", err);
        setLoading(false);
      });
  };

  if (edit && eventId) {
    return (
      <div className="flex flex-col gap-2">
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
          <Button
            type="button"
            onClick={handleSubmitEditImg}
            disabled={loading}
          >
            Upload
          </Button>
        </div>
        {newImg && (
          <div className="flex gap-4 items-center">
            <div className="text-sm">New Image Uploaded</div>
            <FaCheck className="text-green-500" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
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
          required={true}
          // value={inputs.image || ""}
        />
        <Button
          type="button"
          onClick={handleSubmitImg}
          disabled={loading}
          className="w-20"
        >
          {!newImg && "Upload"}
          {newImg && (
            <div>
              <FaCheck className="text-green-500" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadImage;

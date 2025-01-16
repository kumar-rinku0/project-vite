import { FaCalendar, FaLocationPin, FaMessage, FaShare } from "react-icons/fa6";
import { useContent } from "./ContentProvider";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { useEffect } from "react";

const staticImg = {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5KchjSSqPloa4eQ2VL9BG7D2QGJ0thHj_pA&s",
  filename: "ipl image",
};

const staticContent = {
  heading: "QR Code for the URL",
  description: "Scan the QR code to visit the URL",
  time: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
  vanue: "Jaipur",
  info: {
    orginizer: "Rajesh Parik",
    phone: "493948239439",
    email: "example@mail.com",
    website: "www.website.com",
  },
};
const UrlPageQR = () => {
  let params = new URLSearchParams(document.location.search);
  let preview = params.get("preview");
  const { content, image } = useContent();
  useEffect(() => {
    if (preview) {
      console.log("preview=", preview);
      console.log(image, content);
    }
  }, [preview, image, content]);
  // const [popover, setPopover] = useState(false);
  return (
    <div className="w-full min-h-[100vh] flex sm:justify-center items-center">
      <div className="w-96 h-full flex flex-col justify-center items-start gap-4 px-2">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full h-full flex justify-center items-center py-4">
            {image &&
              (typeof image.size === "number" ||
                image instanceof Blob ||
                image instanceof File) && (
                <img
                  src={URL.createObjectURL(image)}
                  alt={staticImg.filename}
                  className="w-full h-full object-cover"
                />
              )}
            {(!image ||
              !(
                typeof image.size === "number" ||
                image instanceof Blob ||
                image instanceof File
              )) && (
              <img
                src={staticImg.url}
                alt={staticImg.filename}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="px-2">
          <h2 className="text-lg">
            {content.eventName || staticContent.heading}
          </h2>
          <p className="text-gray-500">{staticContent.description}</p>
          <button
            className="px-4 py-2 border border-gray-200 rounded-md hover:bg-slate-200 shadow-md"
            type="button"
          >
            get tickets!
          </button>
        </div>
        <hr className="border border-gray-200 w-full" />
        <div className="px-2">
          <div className="flex gap-2 py-1 items-center">
            <FaCalendar />
            <span className="text-gray-500">When</span>
          </div>
          <div>
            {staticContent.time.toLocaleDateString("en-IN", {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <hr className="border border-gray-200 w-full" />
        <div className="px-2">
          <div className="flex gap-2 py-1 items-center">
            <FaLocationPin />
            <span className="text-gray-500">Where</span>
          </div>
          <div>{staticContent.vanue}</div>
        </div>
        <hr className="border border-gray-200 w-full" />
        <div className="px-2">
          <div className="flex gap-2 py-1 items-center">
            <FaMessage />
            <span className="text-gray-500">contect</span>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <div>{staticContent.info.orginizer}</div>
              <div className="text-gray-600 text-sm">orginizer</div>
            </div>
            <div>
              <div>{staticContent.info.phone}</div>
              <div className="text-gray-600 text-sm">phone</div>
            </div>
            <div>
              <div>{staticContent.info.email}</div>
              <div className="text-gray-600 text-sm">email</div>
            </div>
            <div>
              <div>{staticContent.info.website}</div>
              <div className="text-gray-600 text-sm">website</div>
            </div>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="fixed bottom-8 right-4 w-12 h-12 sm:static sm:w-96 rounded-full p-1 flex justify-center items-center ">
              <button
                type="button"
                className="w-full h-full p-2 flex justify-center items-center gap-4 bg-red-200 rounded-full shadow-lg sm:rounded-md"
              >
                <FaShare />
                <span className="hidden sm:flex uppercase sm:text-sm">
                  shere event
                </span>
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div>
              <div>Copy Link!</div>
              <div>Open in Chrome!</div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <div className="fixed bottom-24 right-4 w-12 h-12 sm:static sm:w-96 p-1 flex justify-center items-center">
              <button
                type="button"
                className="p-2 w-full h-full flex justify-center items-center gap-4 rounded-full bg-slate-200 shadow-lg sm:rounded-md"
              >
                <FaCalendar />
                <span className="hidden sm:flex uppercase sm:text-sm">
                  add event to calender
                </span>
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            Event Added to Your Calender!
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default UrlPageQR;

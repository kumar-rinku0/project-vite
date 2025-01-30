import {
  FaCalendar,
  FaChair,
  FaLocationPin,
  FaMessage,
  FaCar,
  FaShare,
  FaTrain,
} from "react-icons/fa6";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { useEffect, useState } from "react";
import { FaTools, FaWifi } from "react-icons/fa";

const staticImg = {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5KchjSSqPloa4eQ2VL9BG7D2QGJ0thHj_pA&s",
  filename: "ipl image",
};

const staticContent = {
  organization: "static orgnization!",
  title: "QR Code for the URL",
  summary: "Scan the QR code to visit the URL",
  from: new Date(),
  to: new Date(),
  vanue: "Jaipur",
  address: "388 Vidhyadhar Nagar Jaipur",
  contect: {
    name: "Rajesh Parik",
    phone: "493948239439",
    email: "example@mail.com",
    website: "www.website.com",
  },
  facility: {
    wifi: "true",
    train: "false",
    car: "false",
    chair: "false",
  },
};
const PreviewPage = () => {
  let params = new URLSearchParams(document.location.search);
  const qs = params.get("qs");
  const [content, setContent] = useState(null);
  useEffect(() => {
    if (qs) {
      const objFromQuery = JSON.parse(decodeURIComponent(qs));
      setContent(objFromQuery);
    }
  }, [qs]);
  return (
    <div className="bg-gradient-to-r from-[#cce3ff] to-[#f0f8ff] w-full min-h-[100vh] flex sm:justify-center items-center">
      <div className="bg-white w-96 h-full flex flex-col justify-center items-start gap-4 px-2">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full h-full relative flex justify-center items-center">
            {content?.imgObj ? (
              <>
                <img
                  src={content.imgObj}
                  alt={staticImg.filename}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-8 left-4 text-xl text-white">
                  {content.organization}
                </div>
              </>
            ) : (
              <img
                src={staticImg.url}
                alt={staticImg.filename}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 px-2">
          <h2 className="text-lg">
            {content?.title ? content.title : staticContent.title}
          </h2>
          <p className="text-gray-500">
            {content?.summary ? content.summary : staticContent.summary}
          </p>
          <button
            className="px-4 py-2 w-fit border border-gray-200 rounded-md hover:bg-slate-200 shadow-md"
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
            {content?.from
              ? new Date(content.from).toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : staticContent.from.toLocaleDateString("en-IN", {
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
          <div>{content?.vanue ? content.vanue : staticContent.vanue}</div>
        </div>
        {content?.facility && (
          <div className="px-2">
            <div className="flex gap-2 py-1 items-center">
              <FaTools />
              <span className="text-gray-500">Facility</span>
            </div>
            <div className="flex gap-2 p-2">
              <span>{content?.facility?.wifi && <FaWifi />}</span>
              <span>{content?.facility?.car && <FaCar />}</span>
              <span>{content?.facility?.train && <FaTrain />}</span>
              <span>{content?.facility?.chair && <FaChair />}</span>
            </div>
          </div>
        )}

        <hr className="border border-gray-200 w-full" />
        <div className="px-2">
          <div className="flex gap-2 py-1 items-center">
            <FaMessage />
            <span className="text-gray-500">contect</span>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <div>
                {content?.contact?.name
                  ? content.contact.name
                  : staticContent.contect.name}
              </div>
              <div className="text-gray-600 text-sm">orginizer</div>
            </div>
            <div>
              <div>
                {content?.contact?.phone
                  ? content.contact.phone
                  : staticContent.contect.phone}
              </div>
              <div className="text-gray-600 text-sm">phone</div>
            </div>
            <div>
              <div>
                {content?.contact?.email
                  ? content.contact.email
                  : staticContent.contect.email}
              </div>
              <div className="text-gray-600 text-sm">email</div>
            </div>
            <div>
              <div>
                {content?.contact?.website
                  ? content.contact.website
                  : staticContent.contect.website}
              </div>
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

export default PreviewPage;

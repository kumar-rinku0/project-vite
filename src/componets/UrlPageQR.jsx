import { FaCalendar, FaLocationPin, FaMessage, FaShare } from "react-icons/fa6";

const image = {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5KchjSSqPloa4eQ2VL9BG7D2QGJ0thHj_pA&s",
  filename: "ipl image",
};

const content = {
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
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-96 h-full flex flex-col justify-center items-start gap-4 px-2">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full h-full flex justify-center items-center py-4">
            <img
              src={image.url}
              alt={image.filename}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="px-2">
          <h2 className="text-lg">{content.heading}</h2>
          <p className="text-gray-500">{content.description}</p>
          <button
            className="px-4 py-2 border border-gray-200 rounded-md hover:bg-slate-200"
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
          <div>{content.time.toLocaleDateString("en-IN", {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</div>
        </div>
        <hr className="border border-gray-200 w-full" />
        <div className="px-2">
          <div className="flex gap-2 py-1 items-center">
            <FaLocationPin />
            <span className="text-gray-500">Where</span>
          </div>
          <div>{content.vanue}</div>
        </div>
        <hr className="border border-gray-200 w-full" />
        <div className="px-2">
          <div className="flex gap-2 py-1 items-center">
            <FaMessage />
            <span className="text-gray-500">contect</span>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <div>{content.info.orginizer}</div>
              <div className="text-gray-600 text-sm">orginizer</div>
            </div>
            <div>
              <div>{content.info.phone}</div>
              <div className="text-gray-600 text-sm">phone</div>
            </div>
            <div>
              <div>{content.info.email}</div>
              <div className="text-gray-600 text-sm">email</div>
            </div>
            <div>
              <div>{content.info.website}</div>
              <div className="text-gray-600 text-sm">website</div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-1 right-4 w-16 h-16 sm:relative sm:left-0 flex justify-center items-center">
          <button type="button" className="p-2 bg-slate-200 rounded-full">
            <FaShare />
          </button>
        </div>
        <div className="fixed bottom-16 right-4 w-16 h-16 sm:relative sm:left-16 flex justify-center items-center">
          <button type="button" className="p-2 bg-red-200 rounded-full">
            <FaCalendar />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlPageQR;

import React from "react";
import { motion } from "motion/react";
import { useRef } from "react";
import { FaEdit, FaPlus, FaQrcode, FaTrashAlt } from "react-icons/fa";

const Card = ({ content }) => {
  const constraintsRef = useRef(null);
  return (
    <motion.div
      ref={constraintsRef}
      className="relative bg-blue-200 overflow-hidden z-10"
    >
      <div className="absolute w-40 h-full flex justify-center items-center overflow-hidden -z-10">
        <div className="flex gap-2 overflow-hidden">
          <FaEdit />
          <FaTrashAlt />
          <FaQrcode />
          <FaPlus />
        </div>
      </div>
      <motion.div
        drag="x"
        ref={constraintsRef}
        // dragElastic={0.5}
        dragConstraints={{ left: 0, right: 150 }}
        dragMomentum={false}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        className="h-16 flex items-center px-2 gap-4 bg-white hover:bg-gray-300"
      >
        <div className="w-12 h-12 relative" id="image">
          <img
            src={content.image}
            alt="event img"
            className="w-12 h-12 object-cover rounded-lg"
          />
        </div>
        <div id="titleSummary" className="w-28 sm:w-56 self-start space-y-1">
          <h4 className="text-sm sm:text-md">{content.title}</h4>
          <p className="text-gray-600 text-xs sm:text-sm">{content.summary}</p>
        </div>
        <div className="w-40">
          <div>{content.venue}</div>
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <div className="text-sm text-gray-500">
            from:
            {" " +
              new Date(content.from).toLocaleDateString("en-IN") +
              " " +
              new Date(content.from).toLocaleTimeString()}
          </div>
          <div className="text-sm text-gray-500">
            to:
            {" " +
              new Date(content.to).toLocaleDateString("en-IN") +
              " " +
              new Date(content.to).toLocaleTimeString()}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;

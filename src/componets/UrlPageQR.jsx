import React from 'react'


const image = {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5KchjSSqPloa4eQ2VL9BG7D2QGJ0thHj_pA&s",
  filename: "ipl image"
}

const content = {
  heading: "QR Code for the URL",
  description: "Scan the QR code to visit the URL"
}
const UrlPageQR = () => {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='max-w-96 flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex justify-center items-center p-4'>
            <img src={image.url} alt={image.filename} className='w-full h-full object-contain' />
          </div>
        </div>
        <div className='px-2'>
          <h2 className='text-lg'>{content.heading}</h2>
          <p className='text-gray-500'>{content.description}</p>
          <button className='px-4 py-2 border border-gray-200 rounded-md hover:bg-slate-200' type="button">get tickets!</button>
        </div>
      </div>
    </div>
  )
}

export default UrlPageQR;
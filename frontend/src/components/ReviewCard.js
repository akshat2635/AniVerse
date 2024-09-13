import React from 'react';

export default function ReviewCard({ username, date, review, stars }) {
  // Function to format the date as "day month"
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="flex flex-col p-3 pt-2 rounded-lg bg-slate-200 h-auto sm:h-24">
      {/* Username and stars at the top */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="font-semibold cursor-pointer text-sm sm:text-base text-black">
            {username}
          </p>
          <div className="text-slate-900 text-sm sm:text-base tracking-[1px] flex items-center">
            <span>{stars}</span>
            <span className="fa fa-star size-4 checked ml-1"></span>
          </div>
        </div>
      </div>

      {/* Review in the middle */}
      {review && (
        <div className="italic mt-1 text-[12px] sm:text-[14px] text-[#4b587c] font-normal flex-grow">
          {review.length > 75 ? review.slice(0, 75) + '...' : review}
        </div>
      )}

      {/* Date at the bottom */}
      <div className="flex gap-3 text-[#4b587c] text-[10px] sm:text-[12px] py-1">
        <span >{formatDate(date)}</span>
      </div>
    </div>
  );
}

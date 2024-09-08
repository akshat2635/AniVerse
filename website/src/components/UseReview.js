import React from 'react'

export default function UseReview() {
  return (
    <div class="flex flex-col p-8 rounded-2xl bg-white">
        <div class="flex">
        <div class="flex gap-4">
            <div class="flex flex-col gap-1">
            <div class="flex gap-3 items-center -mt-1">
                <p class="font-semibold cursor-pointer text-black">Super Petya</p>
                <p class="text-sm text-[#ff6154] cursor-pointer">Follow</p>
            </div>
            <div class="font-light text-md text-[#4b587c]">Cool guy</div>
            </div>
        </div>
        </div>
        <div class="mt-4 text-[#005ef6] text-xl tracking-[2px]">
        ★★★★★
        </div>
        <div class="italic mt-2 text-[18px] text-[#4b587c] font-normal">
        Cucumba
        </div>
        <div class="flex gap-6 text-[#4b587c] text-[12px] mt-4">
        <span class="flex items-center gap-1 cursor-pointer"><span class="text-[8px]">▲</span>Helpful</span>
        <span class="cursor-pointer hover:text-[#ff6154]">Share</span>
        <span class="cursor-pointer">Feb 10</span>
        <span class="-mt-3 text-xl tracking-[1px]">...</span>
        </div>
    </div>
  )
}

import React from 'react'

 const Announcement = () => {
  return (
    <div className='container flex flex-row'>
      <div className="flex flex-1/2 mt-64">Додати оголошення</div>


      <div className="flex flex-col flex-1/2 mt-64 h-full w-full min-h-[525px] bg-main-pink-d rounded-[30px] gap-24">
          <div className="h-[330px] w-11/12 bg-main-pink-l rounded-[30px] mt-48 ml-auto"></div>
          <div className="h-[330px] w-11/12 bg-main-pink-l rounded-[30px] ml-auto mb-8"></div>
        </div>
    </div>
  )
}


export default Announcement;
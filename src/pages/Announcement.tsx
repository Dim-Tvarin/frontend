import announce1 from '../assets/announce1.jpg'
import announce2 from '../assets/announce2.jpg'
import announce3 from '../assets/announce3.jpg'

 const Announcement = () => {
  return (
    <div className='container flex flex-row'>
      <div className="flex flex-1/2 mt-100 text-xl">Додати оголошення</div>


       <div className="w-[630px] bg-orange rounded-[30px] flex flex-col gap-32 py-32 items-end mt-100">
          <div className="w-[600px] rounded-l-[30px] overflow-hidden">
              <img src={announce1} alt="хлопець з хаскі"/>
        </div>
         <div className="w-[600px] rounded-l-[30px] overflow-hidden">
              <img src={announce2} alt="хлопець з хаскі"/>
        </div>
         <div className="w-[600px] rounded-l-[30px] overflow-hidden">
              <img src={announce3} alt="хлопець з хаскі"/>
          </div>
        </div>
    </div>
  )
}


export default Announcement;
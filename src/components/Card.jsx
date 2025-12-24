export default function Card({cardContent}) {
  return (
    <div className="bg-white flex justify-between items-center p-6 rounded-lg shadow-md">
        <div className='font-bold flex flex-col text-gray-600'>
            <p>{cardContent.text}</p>
            <span className='text-3xl'>{cardContent.value}</span>
        </div>
        <div>
            {cardContent.icon}
        </div>
    </div>
  )
}
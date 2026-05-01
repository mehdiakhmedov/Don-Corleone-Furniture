import React from 'react'

export default function Features() {
  return (
    <div className='container mx-auto px-6 py-12'>
  
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
    
    
    <div className='flex flex-col items-center p-6 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-50'>
      <div className="h-24 flex items-center justify-center mb-4">
        <img src="/zemanet.svg" alt="Zəmanət" className="w-40 h-auto cursor-pointer object-contain" />
      </div>
      <h2 className='text-center text-xl font-semibold text-gray-950'>2 il zəmanət</h2>
      <p className='text-gray-500 text-center text-sm font-light mt-2'>Məhsulumuza arxayınıq</p>
    </div>
     

    <div className='flex flex-col items-center p-6 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-50'>
      <div className="h-24 flex items-center justify-center mb-4">
        <img src="/catdirilma.svg" alt="Çatdırılma" className="w-40 h-auto cursor-pointer object-contain" />
      </div>
      <h2 className='text-center text-xl font-semibold text-gray-950'>Pulsuz çatdırılma</h2>
      <p className='text-gray-500 text-center text-sm font-light mt-2'>Etibarlı və həmişə vaxtında</p>
    </div>

    
    <div className='flex flex-col items-center p-6 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-50'>
      <div className="h-24 flex items-center justify-center mb-4">
        <img src="/kredit.svg" alt="Kredit" className="w-40 h-auto cursor-pointer object-contain" />
      </div>
      <h2 className='text-center text-xl font-semibold text-gray-950'>Bir kliklə onlayn kredit</h2>
      <p className='text-gray-500 text-center text-sm font-light mt-2'>Sərfəli şərtlərlə</p>
    </div>

    
    <div className='flex flex-col items-center p-6 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-50'>
      <div className="h-24 flex items-center justify-center mb-4">
        <img src="/odenis.svg" alt="Ödəniş" className="w-40 h-auto cursor-pointer object-contain" />
      </div>
      <h2 className='text-center text-xl font-semibold text-gray-950'>Bir kliklə onlayn ödəniş</h2>
      <p className='text-gray-500 text-center text-sm font-light mt-2'>Təhlükəsiz və sürətli</p>
    </div>

  </div>
</div>
  )
}

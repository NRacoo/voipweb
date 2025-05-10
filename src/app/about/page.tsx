import Image, { StaticImageData } from 'next/image';
import Aria from '../assets/Aria.jpg'
import rafif from '../assets/rafif.jpg'
import bram from '../assets/bram.jpg'
import hani from '../assets/hani.jpg'

export interface Kelompok  {
    id: number
    name: string
    role: string
    image: StaticImageData
}

export const Kelmember =[
    {
        id: 1,
        name: "Hanifah Kamiliya darmawan",
        role:"Divisi Praktikum",
        image: hani,
    },
    {
        id: 2,
        name: "Rafif Riqullah Siregar",
        role:"Divisi Praktikum",
        image:rafif,

    },
    {
        id: 3, 
        name:"Aria Aura Rachman",
        role:"Divisi Riset",
        image: Aria,
    },
    {
        id: 4,
        name:"Abraham Benedick",
        role:"Divisi Riset",
        image: bram,
    },
    
]

export default function KelompokSection () {
    return(
        <section className='mb-16'>
            <div className='mb-8'>
                <h2 className='text-center text-4xl font-bold'>Meet our Team</h2>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap 6'>
                {Kelmember.map((member) => (
                    <div key={member.id} className='flex flex-col items-center'>
                        <div className='relative w-36 h-30  overflow-hidden mb-4'>
                            <Image src={member.image} 
                                alt={member.name} 
                                width={150} height={150} className=' mb-4' />
                        </div>
                        <h3 className='text-xl font-semibold'>{member.name}</h3>
                        <p className='text-gray-500'>{member.role}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
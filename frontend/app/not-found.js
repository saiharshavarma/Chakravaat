'use client'

import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

import CycloneIcon from '@mui/icons-material/Cyclone';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Custom404() {
    const router = useRouter()

    const { data: session } = useSession()
    
    if (session) {
        return(
            <div className='w-screen h-screen bg-black flex flex-col items-center justify-center'>
                <CycloneIcon style={{ color: 'white', fontSize: 225, opacity: 0.7 }}/>
                <div className='text-white p-10 text-2xl'>
                    Looks like the page you were looking for doesn't exist! Feel free to browse for something else!
                </div>
                <div className='px-60 flex w-full'>
                    <div className='flex flex-col w-full mr-6'>
                        <button 
                            className="text-white w-full mb-6 border border-white rounded-md p-2 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                            onClick={() => router.push('/admin')}
                        >REAL TIME</button>
                        <button 
                            className="text-white w-full border border-white rounded-md p-2 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                            onClick={() => router.push('/time-series')}
                        >TIME SERIES</button>
                    </div>
                    <div className='flex flex-col w-full'>
                        <button 
                            className="text-white w-full mb-6 border border-white rounded-md p-2 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                            onClick={() => router.push('/archive')}
                        >CYCLONIC ARCHIVES</button>
                        <button 
                            className="text-white w-full border border-white rounded-md p-2 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                            onClick={() => router.push('/')}
                        >HOME PAGE</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='w-screen h-screen bg-black flex flex-col items-center justify-center'>
                <ExitToAppIcon style={{ color: 'white', fontSize: 225, opacity: 0.7 }}/>
                <div className='text-white p-10 text-2xl'>
                    Looks like you haven't signed in yet! Log in to explore!
                </div>
                <button 
                    className="text-white w-60 border border-white rounded-md p-2 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                    onClick={() => router.push('/')}
                >HOME PAGE</button>
            </div>
        )
    }
}
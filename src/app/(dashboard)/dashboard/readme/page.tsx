'use client'

import { SideBarOption } from '@/types/typings'
import Link from 'next/link'
import { Icons } from '@/components/Icons'
import Button from '@/components/ui/Button'
import { useLocale } from '@/utils/useLocale'

const sideBarOptions: SideBarOption[] = [
    {
        id: 1,
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/santiago-tourn-62834b165/',
        Icon: 'Linkedin',
    },
    {
        id: 2,
        name: 'Whatsapp',
        href: 'https://wa.me/598099076458',
        Icon: 'Phone',
    },
    {
        id: 3,
        name: 'Gmail',
        href: 'https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSGMvlwQCvPMtsBFMJKnNJhFKBwsmKdQqfClgRQMVtBJtjKxSJHvpsTcFxBrkTXBhkLqZkDq',
        Icon: 'Mail',
    },
]

const Page = () => {
    const { toggleLocale, messages } = useLocale();

    return (
        <div className='container py-12'>
            <h1 className='font-bold text-5xl mb-8'>{messages.h1}</h1>
            <div >
                <ul className='-mx-2 mt-2 space-y-1'>
                    <li className='text-gray-700 group flex gap-3 p-2 text-sm leading-6 font-semibold'>{messages.p1}</li>
                    <li className='text-gray-700 group flex gap-3 p-2 text-sm leading-6 font-semibold'>{messages.p2}</li>
                    <li className='text-gray-700 group flex gap-3 p-2 text-sm leading-6 font-semibold'>{messages.p3}</li>
                    <li className='text-gray-700 group flex gap-3 p-2 text-sm leading-6 font-semibold'>{messages.p4}</li>
                    <li className='text-gray-700 group flex gap-3 p-2 text-sm leading-6 font-semibold'>{messages.p5}</li>
                    <li className='text-gray-700 group flex gap-3 p-2 text-sm leading-6 font-semibold'>{messages.p6}</li>
                </ul>
            </div>
            <div>
                <h3 className='font-bold text-3xl mt-8 mb-8'>{messages.h3}</h3>
                <ul role='list' className='-mx-2 mt-2 space-y-1'>
                    {sideBarOptions.map((option) => {
                        const Icon = Icons[option.Icon]
                        return (
                            <li key={option.id}>
                                <Link href={option.href} className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold'>
                                    <span className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
                                        <Icon className='h-4 w-4' />
                                    </span>
                                    <span className='truncate'>{option.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='mt-10'>
                <Button
                    type='button'
                    onClick={toggleLocale}>
                    {messages.buttonText}
                </Button>
            </div>
        </div>
    )
}

export default Page
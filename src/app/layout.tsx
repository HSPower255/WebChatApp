import './globals.css'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang='en'>
      <head>
        <title>Chat App</title>
        <meta name="description" content="Experience real-time messaging with our web application that features Google sign-in, friend requests, and secure authentication. With a modern design made with Tailwind and fully responsive to all screen resolutions, users can easily connect with friends and receive real-time notifications even when they are away from the chat.  " />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:image" content="ogimg.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

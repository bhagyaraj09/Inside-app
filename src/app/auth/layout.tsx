import "../globals.css"

export const metadata = {
  title: 'Symphonize, Inc - Please SignIn',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <div className="content flex flex-row flex-wrap min-h-screen">
          <aside className="w-full md:w-2/3  flex items-center justify-center bg-no-repeat bg-center bg-[url('https://assets-global.website-files.com/634690d9583ce36a5e30c703/65dd6b2e771607d2adcf1925_Group%201186.svg')]">
            <h1 className="text-2xl md:text-3xl lg:text-5xl m-5 justify-center items-center font-medium leading-tight tracking-tight text-white">Amplify your digital transformation</h1>
          </aside>
          <main className="flex pt-1 p-2 w-full md:w-1/3 bg-white items-center justify-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

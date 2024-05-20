import PoweredBy from "@/components/nav/powered-by"
import SignInWithAzure from "@/components/auth/signin-with-azure"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import { redirect } from "next/navigation"

export default async function signInPage() {

  const session = await getServerSession(authOptions)
  if(session)
    return redirect("/")

  return ( 
    <div className="flex flex-col items-center justify-center px-4 py-6 mx-auto min-h-screen lg:py-0">
      <h1 className="text-3xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-3xl ">Employee Portal</h1>
      <div className="w-full bg-white rounded-lg border border-purple-400 md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="flex flex-col p-6 space-y-4 items-center justify-center md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
            </h1>
            <SignInWithAzure /> 
        </div>
      </div>
      <div className="powered-by ">
        <PoweredBy />
      </div>
    </div>
  )
}
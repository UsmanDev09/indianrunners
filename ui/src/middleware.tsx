import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const  token  = request.cookies.get("token")?.value
  try{
    const response= await fetch('http://localhost:5000/api/user/profile', {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
  
    if (!response.ok){
      throw "Error Validating"
    }
  
  } catch(e){
      console.log(e)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile/:slug*','/store/:slug*','/cart','/admin-panel'],
}
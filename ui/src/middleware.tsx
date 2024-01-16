import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try{
    const  token  = request.cookies.get("token")?.value
    if (!token){
      throw "Error Validating"
    }
  
  } catch(e){
      return NextResponse.redirect(new URL('/login', request.url))
    }
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile/:slug*','/store/:slug*','/cart','/admin-panel'],
}
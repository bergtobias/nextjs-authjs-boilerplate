import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const user = req.auth?.user;

  console.log(user, nextUrl.pathname);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

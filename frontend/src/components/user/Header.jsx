import { Search, ShoppingBag, Menu, LogOut, UserRoundPen, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { ModeToggle } from "../ToggleMode";
import { useLogoutMutation } from "@/redux/api/authApi";
import { logOut } from "@/redux/features/authSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const Header = () => {
  const { user, loading, accessToken } = useSelector((state) => state.auth);
  const [logOutMutation] = useLogoutMutation();
  const [previewImage, setPreviewImage] = useState(null);
  // const accessToken = cookies.get('accessToken');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(()=> {
   if(user?.profile?.avatar) setPreviewImage(user?.profile?.avatar)
  }, [user?.profile?.avatar])


  const handdleLogOut = async(e)=> {
    e.preventDefault();
     try {
await logOutMutation().unwrap();
    dispatch(logOut())
    navigate('/', {replace: true})
    toast.success("Logged Out Successfuly")
     } catch(error) {
      toast.error(error.message)
     }
  }

  if(loading){
    return (
      <header className="w-full bg-background border-b border-foreground/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center sm:justify-between h-16">
      {/* Mobile menu button skeleton */}
      <div className="md:hidden">
        <div className="h-9 w-9 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
      </div>

      {/* Logo skeleton */}
      <div className="flex-shrink-0 max-sm:flex-1">
        <div className="h-7 w-24 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
      </div>

      {/* Desktop Navigation skeleton */}
      <nav className="hidden md:flex space-x-7">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="h-4 w-12 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse"
          ></div>
        ))}
      </nav>

      {/* Right side icons skeleton */}
      <div className="flex items-center space-x-3">
        <div className="hidden sm:block h-9 w-9 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-9 w-9 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
        <div className="relative">
          <div className="h-9 w-9 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
          <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="hidden sm:block">
          <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</header>
    )
  }

  return (
    <header className="w-full bg-background border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center sm:justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 max-sm:flex-1">
            <Link to="/" className="text-2xl font-bold text-foreground">
              S2oqMart
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden  md:flex space-x-7">
            <Link
              to="/"
              className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
            >
              Shop
            </Link>
            <a
              href="#"
              className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
            >
              Contact Us
            </a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className={`hidden sm:block`} size="sm">
              <Search className="size-4" />
            </Button>
            <ModeToggle />
            <Link to="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative cursor-pointer"
              >
                <ShoppingBag className="size-4" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>

            {accessToken ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`cursor-pointer  block rounded-full `}
                >
                   <DropdownMenu>

                  <DropdownMenuTrigger asChild>
                    <Avatar >
                    <AvatarImage src={previewImage} />
                    <AvatarFallback>{user?.firstName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-50" align="start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                       <Link to={'/profile'}>
                      <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut><UserRoundPen /></DropdownMenuShortcut>
                      </DropdownMenuItem>
                      </Link>
                     {
                      user?.role === "admin" && (
                         <Link to={'/admin/dashboard'}>
                      <DropdownMenuItem>
                        Dashboard
                        <DropdownMenuShortcut><LayoutDashboard /></DropdownMenuShortcut>
                      </DropdownMenuItem>
                      </Link>
                      )
                     }
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuItem disabled>API</DropdownMenuItem>
                    <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handdleLogOut}>
                      Log out
                      <DropdownMenuShortcut><LogOut /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>

                </DropdownMenu>
                </Button>
              </>
            ) : (
              <Link to={"/login"}>
              <Button variant={`auth`} className={`hidden sm:block`}>
                Login
              </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

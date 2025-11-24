import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Ticket, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthDialog from "./AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated, isOrganizer, signOut } = useAuth();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/all-events?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 64 64" className="w-full h-full">
                  <defs>
                    <linearGradient id="headerInfinityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#3b82f6'}} />
                      <stop offset="50%" style={{stopColor: '#a855f7'}} />
                      <stop offset="100%" style={{stopColor: '#ec4899'}} />
                    </linearGradient>
                  </defs>
                  <path d="M 12 32 C 12 26, 16 22, 20 22 C 24 22, 28 26, 32 32 C 36 38, 40 42, 44 42 C 48 42, 52 38, 52 32 C 52 26, 48 22, 44 22 C 40 22, 36 26, 32 32 C 28 26, 24 22, 20 22" 
                        fill="none" 
                        stroke="url(#headerInfinityGrad)" 
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"/>
                  <text x="32" y="42" fontFamily="Arial" fontSize="28" fontWeight="bold" fill="currentColor" textAnchor="middle">T</text>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">GetTogether</span>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-8 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for events, movies, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                className="w-full pl-10 bg-secondary/50 border-border focus:bg-secondary transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              isOrganizer ? (
                <Button 
                  onClick={() => window.location.href = '/organizer/dashboard'}
                  variant="outline"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  Go to Dashboard
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {user?.name?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            ) : (
              <Button 
                onClick={() => setAuthOpen(true)}
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

export default Header;

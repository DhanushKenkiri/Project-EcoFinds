import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogIn, Menu, Search, Wallet, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Logo from '@/components/Logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const { isAuthenticated, user, logout, connectWallet } = useAuth();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
    setMobileSearchVisible(false);
  };

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-2">
          {user?.walletAddress ? (
            <Button variant="outline" className="hidden md:flex text-xs" size="sm">
              {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => connectWallet()}
            >
              <Wallet className="h-4 w-4 mr-1" /> Connect
            </Button>
          )}
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Link to="/login" className="hidden md:block">
          <Button variant="outline" size="sm">
            <LogIn className="h-4 w-4 mr-1" /> Login
          </Button>
        </Link>
        <Link to="/signup" className="hidden md:block">
          <Button className="bg-eco">Sign Up</Button>
        </Link>
      </div>
    );
  };

  return (
    <header className="border-b sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto py-2 sm:py-3 px-3 sm:px-4">
        <div className="flex items-center justify-between">
          {/* Logo - smaller on mobile */}
          <div className="flex-shrink-0">
            <Logo size={window.innerWidth < 640 ? "small" : "medium"} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/explore" className="px-4 py-2 text-sm font-medium hover:text-eco">
                    Explore
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {["clothing", "electronics", "home", "books", "sports", "toys"].map((category) => (
                        <li key={category}>
                          <Link
                            to={`/explore?category=${category}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none capitalize">
                              {category}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Discover sustainable {category}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/sell" className="px-4 py-2 text-sm font-medium hover:text-eco">
                    Sell
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/resources" className="px-4 py-2 text-sm font-medium hover:text-eco">
                    Resources
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Search Button (Visible when not expanded) */}
          {!mobileSearchVisible && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden mx-1"
              onClick={() => setMobileSearchVisible(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Mobile Search Bar (Expandable) */}
          {mobileSearchVisible && (
            <form onSubmit={handleSearch} className="flex-1 flex md:hidden mx-2">
              <div className="relative w-full flex items-center">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-8"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-0"
                  variant="ghost"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute right-8"
                  onClick={() => setMobileSearchVisible(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8 relative">
            <Input
              type="text"
              placeholder="Search for sustainable finds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Auth & Cart */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Only show auth buttons when mobile search is not visible */}
            {!mobileSearchVisible && renderAuthButtons()}
            
            {/* Always show cart button */}
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent"
                    aria-label={`${totalItems} items in cart`}
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu - Only show when search is not visible */}
            {!mobileSearchVisible && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] sm:w-[350px] pt-10">
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <Logo size="small" />
                      <SheetClose className="rounded-full hover:bg-accent/10 p-1">
                        <X className="h-4 w-4" />
                      </SheetClose>
                    </div>

                    <div className="border-b pb-4">
                      <form onSubmit={handleSearch} className="relative">
                        <Input
                          type="text"
                          placeholder="Search for items..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button 
                          type="submit" 
                          size="icon" 
                          className="absolute right-0"
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>

                    <div className="flex flex-col gap-4">
                      <SheetClose asChild>
                        <Link to="/explore" className="py-2 hover:text-eco">
                          Explore Marketplace
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/categories" className="py-2 hover:text-eco">
                          Browse Categories
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/sell" className="py-2 hover:text-eco">
                          Sell Items
                        </Link>
                      </SheetClose>
                    </div>

                    <div className="flex flex-col gap-3 mt-2 pt-4 border-t">
                      {isAuthenticated ? (
                        <>
                          <SheetClose asChild>
                            <Link to="/profile" className="py-2 hover:text-eco">
                              My Profile
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link to="/my-listings" className="py-2 hover:text-eco">
                              My Listings
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link to="/orders" className="py-2 hover:text-eco">
                              Order History
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link to="/ai-features" className="py-2 hover:text-eco">
                              AI Features
                            </Link>
                          </SheetClose>
                          <Button 
                            variant="outline" 
                            className="w-full mt-2"
                            onClick={() => connectWallet()}
                          >
                            <Wallet className="h-4 w-4 mr-1" /> 
                            {user?.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : 'Connect Wallet'}
                          </Button>
                          <Button className="w-full bg-eco" onClick={() => { logout(); }}>
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <SheetClose asChild>
                            <Link to="/login" className="w-full">
                              <Button variant="outline" className="w-full">Login</Button>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link to="/signup" className="w-full">
                              <Button className="w-full bg-eco">Sign Up</Button>
                            </Link>
                          </SheetClose>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

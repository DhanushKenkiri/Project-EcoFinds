import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogIn, Menu, Search, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
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
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="medium" />

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

          {/* Search Bar - Desktop */}
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
          <div className="flex items-center gap-2">
            {renderAuthButtons()}
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
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
                  <Link to="/explore" className="py-2">
                    Explore Marketplace
                  </Link>
                  <Link to="/categories" className="py-2">
                    Browse Categories
                  </Link>
                  <Link to="/sell" className="py-2">
                    Sell Items
                  </Link>
                  {isAuthenticated ? (
                    <>
                      <Link to="/profile" className="py-2">
                        My Profile
                      </Link>
                      <Link to="/my-listings" className="py-2">
                        My Listings
                      </Link>
                      <Link to="/orders" className="py-2">
                        Order History
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => connectWallet()}
                      >
                        <Wallet className="h-4 w-4 mr-1" /> 
                        {user?.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : 'Connect Wallet'}
                      </Button>
                      <Button className="w-full bg-eco" onClick={logout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="outline" className="w-full">Login</Button>
                      </Link>
                      <Link to="/signup">
                        <Button className="w-full bg-eco">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

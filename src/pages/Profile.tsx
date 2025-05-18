
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Wallet, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, logout, connectWallet } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
  });
  
  const handleUpdate = (data: ProfileFormValues) => {
    setIsUpdating(true);
    // In a real app, this would call an API to update the user profile
    setTimeout(() => {
      toast.success('Profile updated');
      setIsUpdating(false);
    }, 1000);
  };
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">You need to be logged in to view your profile</h1>
        <Link to="/login">
          <Button className="bg-eco mr-4">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="outline">Sign Up</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          {/* Profile Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="w-32 h-32 mx-auto bg-muted rounded-full overflow-hidden mb-4">
                <img 
                  src={user.avatar || "/placeholder.svg"} 
                  alt={user.username} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>{user.username}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Member since</span>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Wallet</span>
                  {user.walletAddress ? (
                    <span className="text-sm">
                      {user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(user.walletAddress.length - 4)}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Not connected</span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              {!user.walletAddress ? (
                <Button 
                  onClick={() => connectWallet()}
                  variant="outline"
                  className="w-full"
                >
                  <Wallet className="h-4 w-4 mr-2" /> Connect Wallet
                </Button>
              ) : (
                <Button 
                  variant="outline"
                  className="w-full"
                  disabled
                >
                  <Wallet className="h-4 w-4 mr-2" /> Wallet Connected
                </Button>
              )}
              <Button 
                variant="destructive"
                className="w-full"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" /> Log Out
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Settings</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account information here.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(handleUpdate)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username"
                        {...register('username')} 
                      />
                      {errors.username && (
                        <p className="text-sm text-destructive">{errors.username.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        {...register('email')} 
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                          <img 
                            src={user.avatar || "/placeholder.svg"} 
                            alt={user.username} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button type="button" variant="outline" size="sm">
                          Change
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="bg-eco"
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your password and security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-eco">Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;


import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, CreditCard, Bitcoin, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EmptyState from '@/components/EmptyState';
import { mockOrders } from '@/data/mockData';

const Orders = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const userOrders = user ? mockOrders.filter(order => order.userId === user.id) : [];
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">You need to be logged in to view your orders</h1>
        <Button className="bg-eco mr-4" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button variant="outline" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </div>
    );
  }
  
  if (userOrders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <EmptyState 
          icon={<ShoppingCart className="h-10 w-10 text-muted-foreground" />}
          title="No orders yet"
          description="Your order history will appear here once you make a purchase."
          actionLabel="Start Shopping"
          actionLink="/explore"
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            View and track your past purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id.substring(0, 6)}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.paymentMethod === 'crypto' ? (
                      <Badge variant="outline" className="flex w-fit gap-1 items-center">
                        <Bitcoin className="h-3 w-3" /> Crypto
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex w-fit gap-1 items-center">
                        <CreditCard className="h-3 w-3" /> Card
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.status === 'completed' ? (
                      <Badge className="bg-eco flex w-fit gap-1 items-center">
                        <Check className="h-3 w-3" /> Completed
                      </Badge>
                    ) : order.status === 'pending' ? (
                      <Badge variant="secondary" className="flex w-fit gap-1 items-center">
                        Pending
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="flex w-fit gap-1 items-center">
                        Cancelled
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => navigate('/explore')}>
            Continue Shopping
          </Button>
        </CardFooter>
      </Card>
      
      {/* Order Details */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        {userOrders.map((order) => (
          <Card key={order.id} className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Order #{order.id.substring(0, 6)}</CardTitle>
                <Badge className={order.status === 'completed' ? 'bg-eco' : 'bg-amber-500'}>
                  {order.status}
                </Badge>
              </div>
              <CardDescription>
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded overflow-hidden">
                      <img 
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.product.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} x ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="font-medium">
                      ${(item.quantity * item.product.price).toFixed(2)}
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t flex justify-between">
                  <p>Total</p>
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;

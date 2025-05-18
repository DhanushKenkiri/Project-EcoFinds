
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductCategory, ProductCondition } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import { toast } from 'sonner';
import { Image } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.nativeEnum(ProductCategory),
  condition: z.nativeEnum(ProductCondition),
  price: z.coerce.number().positive('Price must be greater than 0'),
  location: z.string().min(3, 'Please enter a valid location'),
});

type FormValues = z.infer<typeof formSchema>;

const SellProduct = () => {
  const { isAuthenticated, user } = useAuth();
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>(['/placeholder.svg']);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: undefined,
      condition: undefined,
      price: 0,
      location: user?.walletAddress ? user.walletAddress : '',
    },
  });
  
  const selectedCategory = watch('category');
  const selectedCondition = watch('condition');
  
  const handleAddImage = () => {
    // In a real app, this would open a file picker and upload the image
    // For now, we just add another placeholder
    setImages([...images, '/placeholder.svg']);
    toast.success('Placeholder image added');
  };
  
  const onSubmit = (data: FormValues) => {
    if (!isAuthenticated) {
      toast.error('Please log in to sell products');
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would call an API to create the product
    try {
      // Make sure all required fields are present including the new properties
      const productData = {
        title: data.title,
        description: data.description,
        category: data.category,
        condition: data.condition,
        price: data.price,
        location: data.location,
        images: images,
        name: data.title, // Set name to match title
        image: images[0], // Set image to first image in array
        views: 0 // Initialize views to 0
      };
      
      addProduct(productData);
      
      toast.success('Product listed successfully');
      navigate('/my-listings');
    } catch (error) {
      console.error('Failed to list product:', error);
      toast.error('Failed to list product');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">You need to be logged in to sell products</h1>
        <Button className="bg-eco mr-4" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button variant="outline" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sell a Product</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Enter the details of the product you want to sell
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" {...register('title')} />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={value => setValue('category', value as ProductCategory)}
                      value={selectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ProductCategory).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive">{errors.category.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select
                      onValueChange={value => setValue('condition', value as ProductCondition)}
                      value={selectedCondition}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ProductCondition).map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.condition && (
                      <p className="text-sm text-destructive">{errors.condition.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    {...register('description')} 
                    rows={5} 
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      {...register('price')}
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive">{errors.price.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" {...register('location')} />
                    {errors.location && (
                      <p className="text-sm text-destructive">{errors.location.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div 
                        key={index} 
                        className="aspect-square bg-muted rounded-md overflow-hidden"
                      >
                        <img 
                          src={image} 
                          alt={`Product ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="aspect-square flex flex-col items-center justify-center border-dashed"
                      onClick={handleAddImage}
                    >
                      <Image className="h-6 w-6 mb-1" />
                      <span className="text-xs">Add Image</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-eco"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Listing...' : 'Create Listing'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Listing Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <div className="rounded-full h-5 w-5 bg-eco text-white flex items-center justify-center text-xs">1</div>
                  <p><strong>Clear Photos:</strong> Take photos in good lighting from multiple angles</p>
                </li>
                <li className="flex gap-2">
                  <div className="rounded-full h-5 w-5 bg-eco text-white flex items-center justify-center text-xs">2</div>
                  <p><strong>Detailed Description:</strong> Include size, brand, dimensions, and any defects</p>
                </li>
                <li className="flex gap-2">
                  <div className="rounded-full h-5 w-5 bg-eco text-white flex items-center justify-center text-xs">3</div>
                  <p><strong>Fair Pricing:</strong> Research similar items to set a competitive price</p>
                </li>
                <li className="flex gap-2">
                  <div className="rounded-full h-5 w-5 bg-eco text-white flex items-center justify-center text-xs">4</div>
                  <p><strong>Blockchain Verification:</strong> Verified items sell faster and at better prices</p>
                </li>
              </ul>
              <div className="mt-6 p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">Blockchain Verification</p>
                <p className="text-xs mt-1">
                  After listing your product, you can verify it on the blockchain to increase buyer trust and potentially earn a higher selling price.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellProduct;

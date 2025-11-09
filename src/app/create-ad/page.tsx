import React from 'react';
import { Tabs, TabsContent, TabsTrigger } from '../_components/ui/tabs';
import { TabsList } from '@radix-ui/react-tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../_components/ui/card';
import { Button } from '../_components/ui/button';
import { Label } from '../_components/ui/label';
import { Input } from '../_components/ui/input';
import Header from '../_components/header';
import { Bike, Car } from 'lucide-react';

const CreateAdPage = () => {
    return (
        <div className="min-h-screen">
            <Header searchBarExists={false} variant="black" />
            <div className="mx-auto min-h-screen max-w-3xl p-6">
                <h1 className="mb-6 text-2xl font-semibold">Create Ad</h1>

                <Tabs defaultValue="car" className="w-full">
                    <TabsList
                        aria-label="Select vehicle type"
                        className="relative mx-auto flex w-full max-w-md flex-row rounded-xl border bg-muted/50 p-1 shadow-sm backdrop-blur has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
                    >
                        <TabsTrigger
                            value="car"
                            className="group relative flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:shadow"
                        >
                            <Car className="h-4 w-4 transition-transform group-data-[state=active]:scale-110" />
                            <span>Car</span>
                        </TabsTrigger>

                        <TabsTrigger
                            value="motorcycle"
                            className="group relative flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:shadow"
                        >
                            <Bike className="h-4 w-4 transition-transform group-data-[state=active]:scale-110" />
                            <span>Motorcycle</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* ==== CAR FORM ==== */}
                    <TabsContent value="car" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>New Car Ad</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="car-title">Title</Label>
                                        <Input
                                            id="car-title"
                                            placeholder="e.g., Honda Civic EX 2020"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="car-price">Price</Label>
                                        <Input
                                            id="car-price"
                                            type="number"
                                            placeholder="e.g., 85000"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="car-brand">Brand</Label>
                                        <Input
                                            id="car-brand"
                                            placeholder="e.g., Honda"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="car-model">Model</Label>
                                        <Input
                                            id="car-model"
                                            placeholder="e.g., Civic EX"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="car-year">Year</Label>
                                        <Input
                                            id="car-year"
                                            type="number"
                                            placeholder="e.g., 2020"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="car-image">Image URL</Label>
                                        <Input
                                            id="car-image"
                                            type="url"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="button">Publish Car</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ==== MOTORCYCLE FORM ==== */}
                    <TabsContent value="motorcycle" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>New Motorcycle Ad</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="moto-title">Title</Label>
                                        <Input
                                            id="moto-title"
                                            placeholder="e.g., Yamaha MT-07 2022"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="moto-price">Price</Label>
                                        <Input
                                            id="moto-price"
                                            type="number"
                                            placeholder="e.g., 42000"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="moto-brand">Brand</Label>
                                        <Input
                                            id="moto-brand"
                                            placeholder="e.g., Yamaha"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="moto-model">Model</Label>
                                        <Input
                                            id="moto-model"
                                            placeholder="e.g., MT-07"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="moto-year">Year</Label>
                                        <Input
                                            id="moto-year"
                                            type="number"
                                            placeholder="e.g., 2022"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="moto-image">Image URL</Label>
                                        <Input
                                            id="moto-image"
                                            type="url"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="button">Publish Motorcycle</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default CreateAdPage;

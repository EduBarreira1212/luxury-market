import React from 'react';
import { Tabs, TabsContent, TabsTrigger } from '../_components/ui/tabs';
import { TabsList } from '@radix-ui/react-tabs';
import Header from '../_components/header';
import { Bike, Car } from 'lucide-react';
import CreateCarAdForm from './_components/create-car-ad-form';
import CreateMotorcycleAdForm from './_components/create-motorcycle-ad-form';

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
                    <TabsContent value="car" className="mt-6">
                        <CreateCarAdForm />
                    </TabsContent>
                    <TabsContent value="motorcycle" className="mt-6">
                        <CreateMotorcycleAdForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default CreateAdPage;

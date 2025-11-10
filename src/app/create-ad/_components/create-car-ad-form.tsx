import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';

const CreateCarAdForm = () => {
    return (
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
                        <Input id="car-brand" placeholder="e.g., Honda" />
                    </div>
                    <div>
                        <Label htmlFor="car-model">Model</Label>
                        <Input id="car-model" placeholder="e.g., Civic EX" />
                    </div>
                    <div>
                        <Label htmlFor="car-year">Year</Label>
                        <Input
                            id="car-year"
                            type="number"
                            placeholder="e.g., 2020"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="button">Publish Car</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CreateCarAdForm;

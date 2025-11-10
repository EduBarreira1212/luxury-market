import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';

const CreateMotorcycleAdForm = () => {
    return (
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
                        <Input id="moto-brand" placeholder="e.g., Yamaha" />
                    </div>
                    <div>
                        <Label htmlFor="moto-model">Model</Label>
                        <Input id="moto-model" placeholder="e.g., MT-07" />
                    </div>
                    <div>
                        <Label htmlFor="moto-year">Year</Label>
                        <Input
                            id="moto-year"
                            type="number"
                            placeholder="e.g., 2022"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="button">Publish Motorcycle</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CreateMotorcycleAdForm;

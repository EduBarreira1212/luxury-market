'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';
import { deleteCar } from '../_actions/delete-car';
import { toast } from 'sonner';
import { deleteMotorcycle } from '../_actions/delete-motorcycle';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type EditDeleteContainerProps = {
    id: string;
    isCar: boolean;
};

const EditDeleteContainer = ({ id, isCar }: EditDeleteContainerProps) => {
    const [loading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            if (isCar) {
                const car = await deleteCar(id);
                if (car) {
                    toast.success('Car deleted successfully');
                    router.push('/my-ads');
                }
                return;
            }

            const motorcycle = await deleteMotorcycle(id);
            if (motorcycle) {
                toast.success('Motorcycle deleted successfully');
                router.push('/my-ads');
            }
        } catch (error) {
            console.error('Error when deleting vehicle', error);
            toast.error('Error when deleting vehicle');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Link href={`/edit-ad/${id}`}>
                <Button size="sm" className="rounded-xl">
                    EDIT
                </Button>
            </Link>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        size="sm"
                        variant="destructive"
                        className="rounded-xl"
                        disabled={loading}
                    >
                        DELETE
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the ad.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Yes, delete it
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default EditDeleteContainer;

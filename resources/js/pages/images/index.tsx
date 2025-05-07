import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Images',
        href: '/images',
    },
];

export default function Images() {
    const { images } = usePage().props;
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this image?')) {
            destroy(route('images.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Images" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <div className="mb-4">
                    <Link
                        href={route('images.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add image
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {images.map(({id, image}) => (
                        <div key={id} className="border rounded p-4">
                            <img 
                                src={`/storage/${image}`} 
                                alt="uploaded image" 
                                className="w-full h-auto rounded"
                            />
                            <div className="mt-2 flex justify-between">
                                <button
                                    onClick={() => handleDelete(id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </AppLayout>
    );
}
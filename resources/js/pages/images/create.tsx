import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@headlessui/react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Image Create',
        href: '/images',
    },
];

export default function ImagesCreate() {

    const { data, setData, errors, post } = useForm({
        image: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('images.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Image Create" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <div className="mb-4">
                    <Link
                        href={route('images.index')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Return
                    </Link>
                </div>

                <form onSubmit={submit} method="post" encType="multipart/form-data" className="space-y-6">

                    <div className="grid gap-2">
                        <Label htmlFor="title">Image</Label>

                        <Input
                            id="image"
                            className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-15 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            onChange={(e) => setData('image', e.target.files[0])}
                            required
                            autoComplete="image"
                            type="file"
                        ></Input>

                        <InputError className="mt-2" message={errors.image} />
                    </div>

                    <div>
                        <Button>
                            Upload
                        </Button>
                    </div>
                </form>

            </div>
        </AppLayout>
    );
}

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function Posts() {
    const { posts } = usePage().props;

    const { delete: destroy } = useForm();

    const destroyPost: FormEventHandler = (e, id) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this post?')) {
            destroy(route('posts.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <div className="mb-4">
                    <Link
                        href={route('posts.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Create post
                    </Link>
                </div>

                <div className="overflow-x-auto">

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Content
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {posts.map(({id, title, content}) => (

                                <tr key={id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <form onSubmit={(e) => destroyPost(e, id)}>
                                            <Link
                                                href={route('posts.edit', id)}
                                                className="text-blue-600 hover:text-blue-900 mr-2"
                                            >
                                                Edit
                                            </Link>
                                            <button className="text-red-600 hover:text-red-900">Delete</button>
                                        </form>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

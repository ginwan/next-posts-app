'use client'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { SquarePen, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'

const getPost = async (id: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return res.json()
}

const PostDetails = () => {
    const params = useParams()
    const id = params?.id as string

    const { data: post, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPost(id),
        enabled: !!id,
    })
    return (
        <div>
            {!isLoading && <Card key={post.id} className="w-full py-8">
                <CardHeader>
                    <CardTitle className='text-xl pb-1 text-amber-700 capitalize'>{post.title}</CardTitle>
                    <CardDescription className='text-md'>
                        {post.body}
                    </CardDescription>
                </CardHeader>
                <CardFooter className='flex justify-end'>
                    <Trash2 className="mr-2 h-5 w-5 text-red-600" />
                    <SquarePen className="mr-2 h-5 w-5 text-green-600" />
                </CardFooter>
            </Card>}
        </div>
    )
}

export default PostDetails
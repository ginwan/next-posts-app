import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Post } from '@/lib/types'
import Link from 'next/link'

type Props = {
    posts: Post[] | null | undefined
    isLoading: boolean
}

const Posts = ({ posts, isLoading }: Props) => {
    return (
        <div className='flex flex-wrap gap-6'>
            {!isLoading && posts?.map((post) => (
                <Card key={post.id} className="w-full sm:w-[calc(50%-0.75rem)] hover:cursor-pointer hover:shadow-xl">
                    <Link href={`/posts/${post.id}`}>
                        <CardHeader>
                            <CardTitle className='text-lg pb-1 text-amber-700 capitalize'>{post.title}</CardTitle>
                            <CardDescription className='truncate'>
                                {post.body}
                            </CardDescription>
                        </CardHeader>
                    </Link>
                </Card>
            ))}
        </div>
    )
}

export default Posts
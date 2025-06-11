'use client'

import { AlertDemo } from '@/components/Alert'
import PostForm from '@/components/Form'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { SquarePen, Trash2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

// Fetch a single post
const getPost = async (id: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    if (!res.ok) throw new Error("Failed to fetch post")
    return res.json()
}

// Delete a post
const deletePost = async (id: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error("Failed to delete post")
    return true
}

const PostDetails = () => {
    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string
    const queryClient = useQueryClient()

    // Fetch post
    const { data: post, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPost(id),
        enabled: !!id,
    })

    // Delete post mutation
    const { mutate: deletePostMutate, isPending: isDeleting } = useMutation({
        mutationFn: () => deletePost(id),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['post', id] })
            setAlert({ type: "success", message: "Post deleted successfully." });
            router.push('/') // navigate after delete
        },
        onError: () => {
            setAlert({ type: "error", message: "Failed to delete post." });
        },
    })

    return (
        <div>
            {alert && <AlertDemo type={alert.type} message={alert.message} />}
            {!isLoading && post && (
                <PostForm open={open} setOpen={setOpen} post={post} />
            )}

            {!isLoading && post && (
                <Card key={post.id} className="w-full py-8">
                    <CardHeader>
                        <CardTitle className="text-xl pb-1 text-amber-700 capitalize">
                            {post.title}
                        </CardTitle>
                        <CardDescription className="text-md">
                            {post.body}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end">
                        <Trash2
                            className={`mr-2 h-5 w-5 text-red-600 cursor-pointer ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
                            onClick={() => {
                                if (confirm("Are you sure you want to delete this post?")) {
                                    deletePostMutate()
                                }
                            }}
                        />
                        <SquarePen
                            className="mr-2 h-5 w-5 text-green-600 cursor-pointer"
                            onClick={() => setOpen(true)}
                        />
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}

export default PostDetails

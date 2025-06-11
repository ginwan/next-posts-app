import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import Tiptap from "./Tiptap";
import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { useMutation } from '@tanstack/react-query'
import { Post } from '@/lib/types'
import { AlertDemo } from './Alert'


type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    post?: Post
}


const PostForm = ({ open, setOpen, post }: Props) => {
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const formSchema = z.object({
        title: z.string().min(3, { message: "Title must be at least 3 characters" }),
        body: z.string().min(5, { message: "Body must be at least 5 characters" })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            title: post?.title || "",
            body: post?.body || "",
        }
    })

    // For creating
    const mutationCreate = useMutation({
        mutationFn: async (newPost: { title: string; body: string }) => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify(newPost),
            });
            return res.json();
        },
        onSuccess: () => {
            setOpen(false)
            form.reset()
            setAlert({ type: "success", message: "Post created successfully." });
        },
        onError: () => {
            setAlert({ type: "error", message: "Failed to create post." });
        }
    });

    // For updating
    const mutationUpdate = useMutation({
        mutationFn: async (updatedPost: { id: string; title: string; body: string }) => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
                method: "PUT",
                body: JSON.stringify(updatedPost),
            });
            return res.json();
        },
        onSuccess: () => {
            setOpen(false)
            form.reset()
            setAlert({ type: "success", message: "Post Updated successfully." });
        },
        onError: () => {
            setAlert({ type: "error", message: "Failed to update post." });
        }
    });


    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
        if (post?.id) {
            mutationUpdate.mutate({ ...data, id: String(post.id) })
        } else {
            mutationCreate.mutate(data)
        }
    }

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);


    return (
        <div>
            {alert && <AlertDemo type={alert.type} message={alert.message} />}
            <Dialog open={open} onOpenChange={setOpen}>
                <Form {...form}>
                    <DialogContent className="sm:max-w-[550px] w-full">
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 justify-center'>
                            <DialogHeader>
                                {post?.id ?
                                    <DialogTitle className='text-amber-700'>Update Post</DialogTitle> :
                                    <DialogTitle className='text-amber-700'>Create Post</DialogTitle>
                                }
                            </DialogHeader>

                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <input
                                                {...field}
                                                placeholder='Title'
                                                className='w-full p-2 border rounded-md border-gray-300 focus:outline-none' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='body'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Body</FormLabel>
                                        <FormControl>
                                            <Tiptap body={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {mutationCreate.isError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {(mutationCreate.error as Error)?.message}
                                </p>
                            )}

                            {mutationUpdate.isError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {(mutationUpdate.error as Error)?.message}
                                </p>
                            )}

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button onClick={() => setOpen(false)} type='button' variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type='submit' className='bg-amber-700 hover:bg-amber-600 hover:cursor-pointer'>
                                    {mutationCreate.status === 'pending' || mutationUpdate.status === 'pending' ? 'Posting...' : 'Post'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Form>
            </Dialog>
        </div>
    )
}

export default PostForm
export default function PostDetail({ params }: { params: { slug: string } }){
    return(
        <div>Post {params.slug[2]}</div>
    )
}
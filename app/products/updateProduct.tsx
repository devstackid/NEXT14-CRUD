'use client'
import { useRouter } from 'next/navigation';
import { SyntheticEvent , useState } from 'react';


type Product = {
    id: number;
    title: string;
    price: number;
}

export default function UpdateProduct(product: Product) {
    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    async function handleUpdate(e: SyntheticEvent){
        e.preventDefault();
        setIsMutating(true)
        await fetch(`http://localhost:5000/products/${product.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title : title,
                price : price
            })
        })
        setIsMutating(false)
        router.refresh()
        setModal(false)
    }
    
    function handleChange(){
        setModal(!modal)
    }
  return (
    <div>

        <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>

        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

        <dialog className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit {product.title}</h3>
                <form onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label className="label font-bold">title</label>
                        <input type="text" className="input w-full input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Name"/>
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Price</label>
                        <input type="text" className="input w-full input-bordered" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Product Price"/>
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        {!isMutating ? (
                            <button type="submit" className="btn btn-primary">Update</button>
                        ):(
                            <button type="button" className="btn loading">Updateing..</button>
                        )}
                        
                    </div>
                </form>
            </div>
        </dialog>
    </div>
  )
}


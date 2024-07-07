import { Form, useNavigate, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom' // En caso de usar "Link" tenemos que importarlo en esta misma linea
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from '../services/ProductService'

type ProductDetailsProps = {
    product: Product
}

export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({product} : ProductDetailsProps) {

    // Utilizar useNavigate

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailability = product.availability

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                { formatCurrency(product.price) }
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method='POST'>
                    <button
                        type='submit'
                        name='id'
                        value={product.id}
                        className={`${isAvailability ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        { isAvailability ? 'Disponible' : 'No Disponible' }
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">

                    {
                    /* 
                    Usar "Link" o "useNavigate"

                    Para usar Link llamamos la etiqueta inferior ⬇ como Link y le asignamos el atributo de (to) para direccionar con la siguiente sintaxis 
                    to={`/productos/${product.id}/edit`}

                    Para usar useNavigate llamamos la etiqueta como Button y cambiamos el metodo por (onClick)
                    */
                    }

                    <button
                        // to={`/productos/${product.id}/edit`}
                        onClick={() => navigate(`/productos/${product.id}/edit`)}
                        className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center '
                    >Editar</button>

                    <Form
                        className='w-full'
                        method='POST'
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if(!confirm('¿Eliminar?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type='submit'
                            value='Eliminar'
                            className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center ' 
                        />
                    </Form>
                </div>
            </td>
        </tr> 
  )
}

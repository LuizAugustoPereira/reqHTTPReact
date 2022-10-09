import './App.css';
import { useState, useEffect} from 'react'

// 4 - custom hook
import { useFetch } from './hooks/useFetch';


// 8 - errar url para mostrar o erro, ex mudando a porta
const url = 'http://localhost:3000/products'

function App() {
  const [products, setProducts] = useState([])

  // 4 - custom hook e 5 - refatorando post
  const { data: items, httpConfig, loading, error } = useFetch(url)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  // 1 - Resgatando dados da API
  /* useEffect(() => {
    async function fetchData() {
      const res = await fetch(url)

      const data = await res.json()
  
      setProducts(data)
    }

    fetchData()

  }, [])
  */

  // 2 - Add de produtos
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price
    }

/* const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })

    // 3 - carregamento dinâmico
    const addedProduct = await res.json()

    setProducts((prevProducts) => [...prevProducts, addedProduct])

    console.log(product)
*/

    // 5 - refatorando post
    httpConfig(product, 'POST')


    setName('')
    setPrice('')
  }

  // 9 - desafio 6
  const handleRemove = (id) => {
    httpConfig(id, 'DELETE')
  }

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* 6 - state de loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
            {/* 9 - desafio */}
            <button onClick={() => handleRemove(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>)}
      <div className="add-product">
        <p>Adicionar Produto:</p>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                name='name'
                value={name} />
            </label>
            <label>
              Preço:
              <input 
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                name='price'
                value={price} />
            </label>
            {/* 7 - state de loading no post */}
            {loading ? <p>Aguarde!</p> : <input type='submit' value='Criar' />}
          </form>
      </div>
    </div>
  );
}

export default App;

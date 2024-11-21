interface Params {
    articulo: string;
}

function ArticuloAlmacenPage({params}: {params: Params}) {
  return (
    <div>
      {params.articulo}
    </div>
  )
}

export default ArticuloAlmacenPage

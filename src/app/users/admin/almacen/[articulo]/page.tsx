interface Params {
    articulo: string;
}

function ArticuloAdminPage({params}: {params: Params}) {
  return (
    <div>
      {params.articulo}
    </div>
  )
}

export default ArticuloAdminPage

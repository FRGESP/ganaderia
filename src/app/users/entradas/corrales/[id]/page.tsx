interface Params {
    id: string;
}

function AnimalEntradaspage({params}: {params: Params}) {
  return (
    <div>
      {params.id}
    </div>
  )
}

export default AnimalEntradaspage

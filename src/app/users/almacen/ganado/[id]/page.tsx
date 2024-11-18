interface Params {
    id: string;
}

function AnimalAlmacenpage({params}: {params: Params}) {
  return (
    <div>
      {params.id}
    </div>
  )
}

export default AnimalAlmacenpage
interface Params {
    id: string;
}

function AnimalAdminpage({params}: {params: Params}) {
  return (
    <div>
      {params.id}
    </div>
  )
}

export default AnimalAdminpage
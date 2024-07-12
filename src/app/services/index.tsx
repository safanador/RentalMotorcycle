

export const getLocation = async()=>{
    
  const res = await fetch("api/get-location" , { next: { revalidate: 10 } })

  if(!res.ok){
    throw new Error("Failded to fetch data")
  }
  return res.json()
}

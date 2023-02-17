export type Dish = {
    name: string
    description: string
    broughtBy: number
    serves: number
    allergens: string[]
}

export type PotlukkDishes = {
    potlukkId: number
    dishes: Dish[]
}

export async function dishesQuery(potlukkDishes:PotlukkDishes):Promise<PotlukkDishes> {

    const query = `mutation swapPotlukkDishes($input: DishesSwapInput!){
        swapPotlukkDishes(input: $input){
          potlukkId
          dishes{
            name
            description
            broughtBy
            serves
            allergens
          }
          
        }
      }`

    const variables = {input:potlukkDishes}
    const requestBody = JSON.stringify({query,variables})

    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", 
    {method:"POST", body:requestBody, headers:{
        "Content-Type":"application/json"
    }})
    const responseBody = await httpResponse.json();
    const savedDishes:PotlukkDishes = responseBody.data.swapPotlukkDishes;
    return savedDishes;
}
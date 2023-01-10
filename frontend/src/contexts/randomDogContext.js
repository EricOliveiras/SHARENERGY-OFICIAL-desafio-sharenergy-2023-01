import randomDog from "../services/randomDog"

export const randomDogContext = {
  async getDog() {
    const result = await randomDog.get('/woof.json?include=png,jpg,gif')
    return result
  }
}
import randomUser from '../services/randomUser'

export const randomUserContext = {
  async getUsers() {
    try {
      const result = await randomUser.get('/?results=12')
      const users = result.data.results.map((user) => ({
        name: `${user.name.first} ${user.name.last}`,
        username: `${user.login.username}`,
        email: `${user.email}`,
        image: `${user.picture.thumbnail}`,
        age: `${user.dob.age}`
      }))

      return users
    } catch (error) {
      console.log(error)
    }
  }
}
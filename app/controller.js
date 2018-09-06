const axios = require('axios')

exports.chuckJoke = async () => {
  const url = "http://api.icndb.com/jokes/random"
  try {
    const res = await axios.get(url)
    const joke = await res.data.value.joke
    return joke
  } catch (error) {
    console.error(error)
  }
}

exports.yomamaJoke = async () => {
  const url = "https://api.yomomma.info/"

  try {
    const res = await axios.get(url)
    const joke = await res.data.joke
    return joke
  } catch (error) {
    console.error(error)
  }
}


import axios from 'axios'

var map = {
  characters (data) {
    return data.map(el => [
      el.name,
      el.gender
    ])
  },
  locations (data) {
    return data.map(el => [
      el.name
    ])
  },
  episodes (data) {
    return data.map(el => [
      el.name
    ])
  }
}

async function getRecourseData({ resource, page = 1 }) {
  var response = await axios.get(`https://rickandmortyapi.com/api/${resource.slice(0, -1)}`, {
    params: {
      page
    }
  })

  var {
    data: {
      info: {
        pages: numberOfPages
      } = {},
      results
    } = {}
  } = response

  return {
    numberOfPages,
    results: map[resource](results)
  }
}

export {
  getRecourseData
}
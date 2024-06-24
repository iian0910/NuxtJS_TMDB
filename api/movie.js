const getURL = () => {
  const config = useRuntimeConfig()
  return config.public.TMDBBaseUrl
}

const getAccessKey = () => {
  const config = useRuntimeConfig()
  return config.public.TMDBAccessKey
}

export const getMovieList = async (endpoint) => {
  const url = `${getURL()}${endpoint}`
  const headers = {
    'Authorization': `Bearer ${getAccessKey()}`
  }
  // 因呼叫時機(onMounted)不得與 useFetch 共存，所以這邊改為 $fetch() 來接收 api 資料
  return await $fetch(url, { headers })
}

export const getMovieDetail = async (endpoint) => {
  const url = `${getURL()}${endpoint}`
  const headers = {
    'Authorization': `Bearer ${getAccessKey()}`
  }
  // 因呼叫時機(onMounted)不得與 useFetch 共存，所以這邊改為 $fetch() 來接收 api 資料
  return await $fetch(url, { headers })
}

export const getLang = async (endpoint) => {
  const url = `${getURL()}${endpoint}`
  const headers = {
    'Authorization': `Bearer ${getAccessKey()}`
  }
  // 因呼叫時機(onMounted)不得與 useFetch 共存，所以這邊改為 $fetch() 來接收 api 資料
  return await $fetch(url, { headers })
}
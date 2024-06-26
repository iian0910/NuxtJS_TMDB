const getURL = () => {
  const config = useRuntimeConfig()
  return config.public.TMDBBaseUrl
}

const getAccessKey = () => {
  const config = useRuntimeConfig()
  return config.public.TMDBAccessKey
}

const composableURL = (endpoint) => {
  const info = {
    url: `${getURL()}${endpoint}`,
    headers: {
      'Authorization': `Bearer ${getAccessKey()}`
    }
  }
  
  return info
}

// 因呼叫時機(onMounted)不得與 useFetch 共存，所以這邊改為 $fetch() 來接收 api 資料
export const getAPI = async (endpoint) => {
  const {url, headers} = composableURL(endpoint)
  return await $fetch(url, { headers })
}
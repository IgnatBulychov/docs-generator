import PocketBase from 'pocketbase'

const pb = new PocketBase('http://72.56.69.74:20001')

const addAnalytics = async (files_count) => {
  const userId = getOrSetUserId()
  // example create data
  const data = {
    files_count,
    user_id: userId,
  }

  const record = await pb.collection('generates').create(data)
}

// Функция для получения или создания ID пользователя
function getOrSetUserId() {
  let userId = localStorage.getItem('user_id')

  if (!userId) {
    userId = crypto.randomUUID()
    localStorage.setItem('user_id', userId)
  }

  return userId
}

const addVisit = async () => {
  const userId = getOrSetUserId()
  // example create data
  const data = {
    user_id: userId,
  }

  const record = await pb.collection('visits').create(data)
}

export { addAnalytics, addVisit }

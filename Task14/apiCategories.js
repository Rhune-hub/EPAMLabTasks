
export async function getCategories() {
    const getAPI = (await import('./apiFunction')).default;
    console.log(getAPI)
    const categories = await getAPI('https://api.publicapis.org/categories');
    return categories;
  }

export async function getCategories() {
    const getAPI = (await import('./apiFunction')).default;
    const categories = await getAPI('https://api.publicapis.org/categories');
    return categories;
  }
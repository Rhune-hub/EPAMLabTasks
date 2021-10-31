export async function getEntries(category) {
    const categoryFirstWord = category.split(' ')[0];
    const getAPI = (await import('./apiFunction.js')).default;
    const apiData = await getAPI(`https://api.publicapis.org/entries?category=${categoryFirstWord}&https=true`);
    if (apiData) {
      const entries = apiData.entries;
      
      return entries;
    }
    else return null;
  }
export default async function getAPIData(url) {
    try {
      const data = await fetch(url);
      return await data.json();
    } catch(error) {
      throw new Error('Could not get data from the server.');
    }
}
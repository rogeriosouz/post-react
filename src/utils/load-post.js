export const loadPost = async () => {
  const postResponse = fetch('https://jsonplaceholder.typicode.com/posts')
  const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos')

  const [post, photos] = await Promise.all([postResponse, photoResponse]);

  const postJson = await post.json();
  const photosJson = await photos.json();

  const postsandPhotos = postJson.map((posts, index) => {
    return {
      ...posts, cover: photosJson[index].url
    }
  });

  return postsandPhotos;
}
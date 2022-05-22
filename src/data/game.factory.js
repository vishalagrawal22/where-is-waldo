function GameFactory(id, imageName, imageURL, characters) {
  const image = {
    name: imageName,
    URL: imageURL,
  };
  return { id, image, characters };
}

export default GameFactory;

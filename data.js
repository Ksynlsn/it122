let cats = [
    { name: 'blue', 
      age: 4,
      breed: 'Russian Blue-Grey', 
      sex: 'male', 
      temperment: 'friendly', 
      favToys: ['bird toy', 'catnip'], 
      isAvailable: true},

    { name: 'moose', 
      age: 3, 
      breed: 'American Shorthair', 
      sex: 'male', 
      temperment: 'affectionate', 
      favToys: ['ball', 'catnip'], 
      isAvailable: false},

    { name: 'cookie', 
      age: 6, 
      breed: 'Bengal', 
      sex: 'male', 
      temperment: 'shy', 
      favToys: ['ball', 'catnip', 'cat tree'], 
      isAvailable: true},

    { name: 'ashes', 
      age: 12, 
      breed: 'Tuxedo', 
      sex: 'female', 
      temperment: 'independent', 
      favToys: ['ribbon', 'string'], 
      isAvailable: false},

    { name: 'waffles', 
      age: 7, 
      breed: 'Tabby', 
      sex: 'male', 
      temperment: 'friendly', 
      favToys: ['laser toy', 'ball'], 
      isAvailable: true},

    { name: 'pookie', 
      age: 4, 
      breed: 'Siamese', 
      sex: 'male', 
      temperment: 'playful', 
      favToys: ['bird toy', 'string', 'fish toy'], 
      isAvailable: true},

    { name: 'ginger', 
      age: 2, 
      breed: 'Abyssinian', 
      sex: 'female', 
      temperment: 'shy', 
      favToys: ['ball', 'catnip'], 
      isAvailable: true}
];

// getAll method
const getAll = () => {
    return cats;
}

// getItem method
const getItem = (name) => {
    return cats.find((cat) => cat.name === name);
}

// display image
const setImagePath = (name) => {
  let imagePath = "/images/cat_image.jpeg"; 
  const picture = cats.find((cat) => cat.name === name);
    if (picture) {
      imagePath = `/images/${name}.jpeg`; 
    }
    return imagePath;
  }
  


export { getAll, getItem, setImagePath }




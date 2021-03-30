export interface Post {
  id: number;
  nameRecipe: string;
  ingredients: string;
  author: string;
  preparation: string;
  time: string;
  titleImage: string;
  hardLevel: string;
  cost: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  token: string;
}



import {User} from "../models/user.model";

export const mockUser: User[] = [
  {
    id: '0',
    isAdmin: true,
    nom: "Martin",
    prenom: "Micheline",
    age: 35,
    sex: "Female",
    pathology: 0,
    path_pp: "../assets/profile_picture.png",
    "need_big_button": true,
    "need_big_text": true
  },
  {
    id: '1',
    isAdmin: false,
    nom: "Janeau",
    prenom: "Patrick",
    age: 75,
    sex: "Male",
    pathology: 1,
    path_pp: "../assets/profile_picture.png",
    "need_big_button": true,
    "need_big_text": true
  },
  {
    id: '2',
    isAdmin: false,
    nom: "Dupont",
    prenom: "Jean-Marc",
    age: 87,
    sex: "Male",
    pathology: 2,
    path_pp: "../assets/profile_picture.png",
    "need_big_button": true,
    "need_big_text": true
  },
  {
    id: '3',
    isAdmin: false,
    nom: "Luckas",
    prenom: "Yvette",
    age: 73,
    sex: 'Female',
    pathology: 4,
    path_pp: "../assets/profile_picture.png",
    "need_big_button": true,
    "need_big_text": true
  }
];

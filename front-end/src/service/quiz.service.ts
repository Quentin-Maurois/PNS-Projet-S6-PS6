import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Quizz} from "../mocks/quizz.mock";
import {Quiz} from "../models/quizz.models";
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  //The list of quiz. The list is
  // retrieved from the mock.
  private themeId = 0;  //valeur de base
  private quizUrl;

  private httpOptions = httpOptionsBase;

  private quizzes$ = new BehaviorSubject<Quiz[]>([]);
  public quizzes: Quiz[] = []; // Ici on initialise la valeur avec un mock QUIZ_LIST
  // The service's constructor. Le constructeur peut prendre en paramètre les dépendances du service - comme ici,
  // HttpClient qui va permettre de récupérer les données d'un serveur
  constructor(private http: HttpClient) {
    this.quizUrl = serverUrl + '/themes/' + this.themeId + '/quizzes';

  }
  setThemeId(themeId: number) {
    this.themeId = themeId;
    this.quizUrl = serverUrl + '/themes/' + this.themeId + '/quizzes';
    this.retrieveQuizs();
  }




  addQuiz(nameQuiz: String){
    //this.quizzes.push(q);
    this.http.post<{name:String}>(this.quizUrl, nameQuiz, this.httpOptions)//.subscribe(() => this.retrieveQuizs());
    this.printQuiz();

  }


  deleteQuiz(id: String){
    // delete qui on bdd, not on mock
    this.http.delete(this.quizUrl + '/' + id, this.httpOptions).subscribe(() => this.retrieveQuizs());
    //this.quizzes = this.quizzes.filter(quiz => quiz.id !== id);
  }

  printQuiz(){
    for(let i=0; i<this.quizzes.length; i++){
    }
  }


  getQuiz(id: String): Quiz | undefined {
    let quiz = this.quizzes.find(quiz => quiz.id == id);
    return quiz;
  }

  getIndexToCreate(){
    //loop on all quizz and return the max id+1
    let maxId: string ="";
    for(let i=0; i<this.quizzes.length; i++){
      if(this.quizzes[i].id>maxId){
        maxId=this.quizzes[i].id;
      }
    }
    return maxId+1;
  }


  private retrieveQuizs() {
     this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  public getQuizFromEditQuiz(idTheme: number, idQuiz: string | null) {
    // utiliser les promises faire le get et retourner ensuite le quiz, d'id idQuiz et d'idTheme idTheme
    let newQuizUrl = serverUrl + '/themes/' + idTheme + '/quizzes';
    return new Promise(resolve => {
      this.http.get<Quiz[]>(newQuizUrl).subscribe((quizList) => {
        this.quizzes = quizList;
        this.quizzes$.next(this.quizzes);
        let quiz = this.quizzes.find(quiz => quiz.id == idQuiz?.toString());
        resolve(quiz);
      });
    }).then((quiz) => {
      return quiz;
    });
  }

  // todo : finir le put d'un quiz
  // todo : ne pas oublie de pouvoir ajoutr des question a un quiz, aller voir le service question
  updateQuiz(nameQuiz: String, idQuiz: String, idTheme: number) {
    let newQuizUrl = serverUrl + '/themes/' + idTheme + '/quizzes/' + idQuiz;
    // ici ca marche plutot bien mais le problème c'est qu'il veux une question, jsp pk
    console.log("UPDATE QUIZ" , {name:nameQuiz, themeId: idTheme});
    this.http.put<{name:String, themeId: Number}>(newQuizUrl, {name:nameQuiz, themeId: idTheme}, this.httpOptions).subscribe(() => this.retrieveQuizs());
  }


}

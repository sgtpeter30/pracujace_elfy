import { Injectable } from "@angular/core";


export interface BlackListResponse {
  isBlackList: boolean, 
  dialogText: string
}

@Injectable({
  providedIn: 'root',
})
export class BlackListService {
  private healthRelated:string[] = [
    'zdrowi',
    'zdrowia',
    'zdrowi byli'
  ]

  private healthTexts:string[] = [
    'Prosiłeś już o zdrowie dla całej rodziny, teraz powiedz co Ty chcesz',
    'No wiesz, a mikołaj się tak dla Ciebie napracował...',
    'Ta na Titanicu wszyscy zdrowi byli i co to dało im rodzinom?',
    'A może lepiej skrzydła? Zdrowym można być a bez skrzydeł ciężko z piętra zejść :)',
    'A może chociaż jakieś konkretne tabletki, albo masaż?'
  ]

  public isOnBlackList(name: string, description: string):BlackListResponse{
    let response: BlackListResponse = {isBlackList: false, dialogText: ''};
    this.healthRelated.forEach(value=>{
      if(name.includes(value) || description.includes(value)){
        const randIndex = Math.floor(Math.random() * (this.healthTexts.length - 0));
        response = {
          isBlackList: true,
          dialogText: this.healthTexts[randIndex],
        }
      }
    })
    return response
  }
  
}
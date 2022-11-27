import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  url = 'http://localhost:3000/list'
  postUrl = 'http://localhost:3000/sortedList'
  notSortedlist: any;

  constructor(
    private http: HttpClient
  ){}


  ngOnInit() {
    // this.getData();
  }

  public getData(){
    this.http.get(this.url)
    .subscribe((data) =>{
      this.notSortedlist = data as [];
      this.notSortedlist.forEach((element: any) => {
        const list = this.getList(element["Lista"])
        const newElement = {
          name: element["Nazywam się:"],
          list: list
        }

        this.http.post(this.postUrl, newElement).subscribe()
      });
    })
  }
  getList(listString: string){
    const listObj: any = []
    let tempList = listString.split('Nazwa prezentu:')
    tempList = tempList.filter(a=>a!=='')
    // tempList.splice(tempList.indexOf(''), 1)

    tempList.forEach(el =>{
      let tempObj = el.split(/(?: Link:|, Dodatkowe informacje:)/)
      listObj.push({
        name: tempObj[0].trim(),
        link: tempObj[1].trim(),
        additionalInfo: tempObj[2].trim(),
      })
    })
    return listObj;
  }
}

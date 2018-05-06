import { Pipe } from "@angular/core";

@Pipe({
  name: "bytOrderBy"
})
export class BYTOrderByPipe {
  transform(value) {
     value.sort(function(a, b){
       return b.total - a.total;
     });
    return value;
  }
}

@Pipe({
  name: "bytOrderByDate"
})
export class BYTOrderByDatePipe {
  transform(value) {
     value.sort(function(a: any, b: any){
       let x1: any = new Date(b.date);
       let x2: any = new Date(a.date)
       return x1 - x2;
     });
    return value;
  }
}
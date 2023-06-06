import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

import { retry, take, map,filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent  implements OnDestroy{

  public  intervalSubscription!: Subscription;

  constructor() {



    // this.retonaObservable().pipe(
    //   retry()
    // ).
    //   subscribe(
    //     valor => console.log('Subs:', valor),
    //     error => console.warn('Error', error),
    //     () => console.log('obs terminado')
    //   );

  this.intervalSubscription =  this.retornaIntervalo().subscribe(console.log)

  }
  ngOnDestroy(): void {

   this.intervalSubscription.unsubscribe();
  }



  retornaIntervalo():Observable<number> {

    return interval(500).pipe(
      take(20),
      map(valor => {  return valor + 1}),
      filter(valor => (valor%2 === 0) ? true:false),
    );

  }

  retonaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {


      const intervalor = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {

          clearInterval(intervalor);
          observer.complete();

        }

        if (i === 2) {
          observer.error('i es igual a 2');
        }

      }, 1000)
    });
    return obs$;
  }


}

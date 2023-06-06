import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription, pipe } from 'rxjs';

import { retry, take, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-beadcrumbs',
  templateUrl: './beadcrumbs.component.html',
  styles: [
  ]
})
export class BeadcrumbsComponent implements OnDestroy{

  public titulo !: string;
  public tituloSUbs$!: Subscription;


  constructor(private router: Router, private route:ActivatedRoute) {

  
  this.tituloSUbs$=  this.getArgumentosRuta()
                  .subscribe(({ titulo }) => {
                      this.titulo = titulo;
                      document.title = `Adminpro - ${titulo}`;
                    })

  }
  ngOnDestroy(): void {
    
    this.tituloSUbs$.unsubscribe();
  }



  getArgumentosRuta() {
   return  this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data),
    )

  }



}

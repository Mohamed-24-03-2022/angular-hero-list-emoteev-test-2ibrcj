import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe, Observable } from 'rxjs';
import { heroQuery } from './hero.selectors';
import { Hero, HeroState } from './hero.state';
import * as HeroActions from './hero.actions';

@Injectable({ providedIn: 'root' })
export class HeroFacade {
  public readonly heroes$: Observable<Hero[]>;
  public readonly heroNames$: Observable<string[]>;

  public constructor(private readonly store: Store<HeroState>) {
    // it has readonly property, so cant initialize it in ngOnInit
    this.heroes$ = this.store.select(pipe(heroQuery.getHeroes));
    this.heroNames$ = this.store.select(pipe(heroQuery.getHeroNames));
    // this.heroes$.subscribe((heroes) => console.log(heroes));
    // console.log(this.heroNames$);
  }

  /**   
cant init those in ngOnInit cuz they are readonly
   public ngOnInit(): void {
     this.heroes$ = this.store.select(pipe(heroQuery.getHeroes));
     this.heroNames$ = this.store.select(pipe(heroQuery.getHeroNames));
   } 
  **/

  public addHero(hero: Hero): void {
    // console.log('add hero : ', hero);

    this.store.dispatch(HeroActions.addHero({ hero }));
  }

  public removeHero(name: string): void {
    this.store.dispatch(HeroActions.removeHero({ name }));
  }

  public updateHero(name: string, hero: Hero): void {
    // console.log('updateHero : ', name, hero);
    this.store.dispatch(HeroActions.updateHero({ name, hero }));
  }
}

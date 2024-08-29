import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { HeroFacade } from './hero/hero.facade';
import { HeroService, HeroesXhr } from './hero/hero.service';
import { Hero } from './hero/hero.state';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly heroes$: Observable<Hero[]>;
  public formGroup: FormGroup;

  // hero state to know which hero is being modified
  private beingModifiedHero: Hero;

  public heroesXhr: HeroesXhr[];

  public isFirstView: boolean;

  public constructor(
    private readonly fb: FormBuilder,
    private readonly heroService: HeroService,
    private readonly heroFacade: HeroFacade
  ) {
    // it has readonly property, so cant initialize it in ngOnInit
    this.heroes$ = this.heroFacade.heroes$;
  }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      power: ['', Validators.required],
      img: ['', Validators.required],
    });

    this.heroService.getHeroesXhr().subscribe((heroesXhr) => {
      this.heroesXhr = heroesXhr;
    });

    this.isFirstView = true;
  }

  public save(): void {
    if (this.formGroup.valid) {
      // const hero = this.formGroup.value;
      // const heroName = this.formGroup.get('name').value;

      this.heroFacade.heroNames$.pipe(first()).subscribe((heroNames) => {
        // console.log(heroNames);
        // if (heroNames.includes(heroName)) {
        if (
          this.beingModifiedHero &&
          heroNames.includes(this.beingModifiedHero.name)
        ) {
          this.heroFacade.updateHero(
            this.beingModifiedHero.name,
            this.formGroup.value
          );
          // this.beingModifiedHero = hero;
          this.beingModifiedHero = null;
          this.formGroup.reset();
        } else {
          this.heroFacade.addHero(this.formGroup.value);
          this.formGroup.reset();
        }
      });
    }
  }

  public setBeingModifiedHero(hero: Hero): void {
    this.beingModifiedHero = hero;
  }

  public setIsFirstView(): void {
    this.isFirstView = !this.isFirstView;
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Hero } from '../../hero/hero.state';
import { HeroesXhr } from '../../hero/hero.service';
import { FormGroup } from '@angular/forms';
import { HeroFacade } from '../../hero/hero.facade';

@Component({
  selector: 'display-hero-component',
  templateUrl: './display-hero.component.html',
  styleUrls: ['./display-hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayHeroComponent {
  @Input() hero: Hero;
  @Input() heroesXhr: HeroesXhr[];
  @Input() heroFacade: HeroFacade;
  @Input() formGroup: FormGroup;
  @Input() isFirstView: boolean;

  @Output() sendBeingModifiedHero = new EventEmitter<Hero>();

  private beingModifiedHero: Hero;

  public constructor() {}

  public ngOnInit(): void {}

  public delete(heroName: string): void {
    this.heroFacade.removeHero(heroName);
    this.formGroup.reset();
  }

  public edit(hero: Hero): void {
    this.formGroup.patchValue(hero);

    this.beingModifiedHero = hero;
    this.sendBeingModifiedHero.emit(hero);
  }
}

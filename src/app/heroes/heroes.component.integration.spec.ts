import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { HeroService } from '../services/hero service/hero.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { appConfig } from '../app.config';

@Component({ standalone: true, template: '<div></div>', selector: 'app-hero' })
class HeroComponentMock {
  @Input() hero!: Hero;
}

describe('heroes component (integration)', () => {
  let component: HeroesComponent,
    heroServiceMock: jasmine.SpyObj<HeroService>,
    heroesMock: Hero[];
  let fixture: ComponentFixture<HeroesComponent>;
  beforeEach(() => {
    heroesMock = [
      { id: 100, name: 'superman', strength: 10 },
      { id: 101, name: 'batman', strength: 15 },
    ];
    heroServiceMock = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);
    heroServiceMock.getHeroes.and.returnValue(of(heroesMock));

    TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [HeroesComponent],
      })
    ).overrideComponent(HeroesComponent, {
      set: {
        imports: [HeroComponentMock],
        providers: [{ provide: HeroService, useValue: heroServiceMock }],
      },
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });
  it('expect heroes[] to be empty', () => {
    expect(component.heroes).toHaveSize(0);
  });
  it('expect after ngOninit() to set heroes[] and getHeroes from service to have been called then detect that in template', () => {
    component.ngOnInit();
    expect(heroServiceMock.getHeroes).toHaveBeenCalled();
    expect(component.heroes).toHaveSize(2);
    fixture.detectChanges();
    //access template
    let liTags = fixture.debugElement.queryAll(By.css('li'));
    expect(liTags).toHaveSize(2);
  });
  it('expect after ngOninit() to send hero to children correctly', () => {
    component.ngOnInit();
    fixture.detectChanges();

    //access children
    let children = fixture.debugElement.queryAll(
      By.directive(HeroComponentMock)
    );
    expect(children).toHaveSize(2);
    expect(children[0].componentInstance.hero.name).toBe('superman');
  });
});

import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../services/hero service/hero.service';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, input } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({ template: '<div></div>', selector: 'app-hero', standalone: true })
class HeroComponentMock {
  @Input() hero!: Hero;
}

describe('heroes component', () => {
  let mockHeroService: jasmine.SpyObj<HeroService>,
    fixture: ComponentFixture<HeroesComponent>,
    component: HeroesComponent,
    heroMock: Hero[];
  beforeEach(() => {
    heroMock = [
      { id: 100, name: 'super man', strength: 10 },
      { id: 101, name: 'bat man', strength: 16 },
    ];
    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);
    mockHeroService.getHeroes.and.returnValue(of(heroMock));

    TestBed.configureTestingModule({
      imports: [HeroesComponent],
    }).overrideComponent(HeroesComponent, {
      set: { imports: [HeroComponentMock], 
        providers: [ {provide:HeroService,useValue:mockHeroService} ] 
        },
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });
  it('should get heroes after calling ngOninit', () => {
    component.ngOnInit()

    expect(mockHeroService.getHeroes).toHaveBeenCalled()
    expect(component.heroes).toHaveSize(2)
    fixture.detectChanges()
    //access li tags
   let liTags= fixture.debugElement.queryAll( By.css("li"))

   expect(liTags).toHaveSize(2)

   let children= fixture.debugElement.queryAll( By.directive(HeroComponentMock) )
   expect(children[0].componentInstance.hero.name).toBe(heroMock[0].name)
  });
});

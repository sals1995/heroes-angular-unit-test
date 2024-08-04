import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../services/hero service/hero.service";
import { HeroesComponent } from "./heroes.component";


describe("heroes component", () => {
  let mockHeroService:jasmine.SpyObj<HeroService>,component:HeroesComponent,heroMock:Hero[]
    beforeEach(()=>{
      heroMock=[
        {id:100,name:"super man",strength:10},
        {id:101,name:"bat man",strength:16},
      ]
       mockHeroService= jasmine.createSpyObj(["getHeroes","addHero","deleteHero"])
       mockHeroService.getHeroes.and.returnValue(of(heroMock))
       component= new HeroesComponent(mockHeroService)
    })
  it('should get heroes after calling ngOninit', () => {
    component.ngOnInit()

    expect(component.heroes.length).toBe(2)
    expect(component.heroes[0].name).toBe("super man")
    expect(mockHeroService.getHeroes).toHaveBeenCalled()
  });
})
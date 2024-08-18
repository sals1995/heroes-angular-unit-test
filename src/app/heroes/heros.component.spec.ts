import { of } from "rxjs";
import { HeroService } from "../services/hero service/hero.service";
import { HeroesComponent } from "./heroes.component";


fdescribe("heroes component", () => {
  let component:HeroesComponent,heroServiceMock:jasmine.SpyObj<HeroService>;
  beforeEach(()=>{
    let heroes=[
      {id:101,name:"super man",strength:10},
      {id:102,name:"bat man",strength:20},
    ]
    heroServiceMock= jasmine.createSpyObj(["getHeroes","addHero","deleteHero"])
    heroServiceMock.getHeroes.and.returnValue(of(heroes))

    component= new HeroesComponent(heroServiceMock)
  })
  it('expect after ngOnInit, should get heroes and getHeroes in service should been called', () => {
    component.ngOnInit()

    expect(component.heroes).toHaveSize(2)
    expect(heroServiceMock.getHeroes).toHaveBeenCalled();
  });
})
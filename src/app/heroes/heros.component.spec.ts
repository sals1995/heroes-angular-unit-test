import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";
import { HeroService } from "../services/hero service/hero.service";


describe("heroes component (class only)", () => {
  let component:HeroesComponent,heroServiceMock:jasmine.SpyObj<HeroService>,heroesMock:Hero[]
  beforeEach(()=>{
    heroesMock=[
      {id:100,name:"superman",strength:10},
      {id:101,name:"batman",strength:15},
    ]
   heroServiceMock= jasmine.createSpyObj(["getHeroes","addHero","deleteHero"])
   heroServiceMock.getHeroes.and.returnValue(of(heroesMock))

    component= new HeroesComponent(heroServiceMock)
  })
    it('expect heroes[] to be empty', () => {
        expect(component.heroes).toHaveSize(0)
      });
      it("expect after ngOninit() to set heroes[] and getHeroes from service to have been called",()=>{
        component.ngOnInit()
        expect(heroServiceMock.getHeroes).toHaveBeenCalled()
        expect(component.heroes).toHaveSize(2)
      })
      it("expect after ngOninit() to set heroes[] and deleteHeroes from service to have been called",()=>{
        component.ngOnInit()
        component.delete({id:100,name:"superman",strength:10})
        expect(heroServiceMock.getHeroes).toHaveBeenCalled()
        expect(heroServiceMock.deleteHero).toHaveBeenCalled()//
        expect(component.heroes).toHaveSize(1)
      })
      
})
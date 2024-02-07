import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../services/hero service/hero.service";
import { Hero } from "../hero";

describe("heroes component (class only)", () => {
    let component:HeroesComponent,mockHeroService:jasmine.SpyObj<HeroService>,mockHeroes:Hero[]
    beforeEach(()=>{
        mockHeroes=[
            {id:100,name:"superman",strength:10},
            {id:101,name:"batman",strength:20},
        ]
        mockHeroService= jasmine.createSpyObj(["getHeroes","addHero","deleteHero"])
        mockHeroService.getHeroes.and.returnValue(of(mockHeroes))
        component= new HeroesComponent(mockHeroService)
    })
    it('expect heroes [] to be empty', () => {
        expect(component.heroes).toHaveSize(0)
    });
    it("expect after calling ngOnInit heroes not empty",()=>{
        component.ngOnInit()
        expect(mockHeroService.getHeroes).toHaveBeenCalled()
        expect(component.heroes).toEqual(mockHeroes)
    })
})
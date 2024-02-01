import { of } from "rxjs"
import { HeroesComponent } from "./heroes.component"
import { Hero } from "../hero"
import { HeroService } from "../services/hero service/hero.service"

describe("heroes component (isolation)", () => {
    let component: HeroesComponent,mockHeroes:Hero[],mockHeroService:jasmine.SpyObj<HeroService>
    beforeEach(()=>{
        mockHeroes=[
            {id:100,name: "super man",strength:17},
            {id:101,name: "bat man",strength:6},
        ]
         mockHeroService= jasmine.createSpyObj(["getHeroes","deleteHero"])
        mockHeroService.getHeroes.and.returnValue( of(mockHeroes) )
        // mockHeroService.getHeroes.and.callFake(function(){ return of(mockHeroes)})
         component= new HeroesComponent(mockHeroService)
    })
    it("expect heroes[] to be empty",()=>{
        expect(component.heroes.length).toBe(0)
    })
    it("expect heroes to be set successfully when ngOninit()",()=>{
        component.ngOnInit()

        expect(component.heroes.length).withContext("length").toBe(2)
        expect(component.heroes[0].name).withContext("name of hero in heroes[]").toBe(mockHeroes[0].name)
        expect(mockHeroService.getHeroes).toHaveBeenCalled()
    })
    it("expect to delete 'super man' successfully when delete()",()=>{
        component.ngOnInit()

        component.delete(mockHeroes[0])

        expect(component.heroes.length).toBe(1)
        expect(mockHeroService.deleteHero).toHaveBeenCalledOnceWith(mockHeroes[0])
    })
})
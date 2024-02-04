import { Observable, of } from "rxjs"
import { HeroesComponent } from "./heroes.component"
import { Hero } from "../hero"
import { HeroService } from "../services/hero service/hero.service"
import { fakeAsync, flush, tick } from "@angular/core/testing"

describe("heroes component (isolation)", () => {
    let component: HeroesComponent, mockHeroes: Hero[], mockHeroService: jasmine.SpyObj<HeroService>, obs: Observable<Hero[]>
    beforeEach(() => {
        mockHeroes = [
            { id: 100, name: "super man", strength: 17 },
            { id: 101, name: "bat man", strength: 6 },
        ]
        mockHeroService = jasmine.createSpyObj(["getHeroes", "deleteHero"])
        obs = new Observable((observer) => {
            setTimeout(() => {
                observer.next(mockHeroes)
            }, 10000)
        })
        mockHeroService.getHeroes.and.returnValue(obs)
        // mockHeroService.getHeroes.and.callFake(function(){ return of(mockHeroes)})
        component = new HeroesComponent(mockHeroService)
    })
    it("expect heroes[] to be empty", () => {
        expect(component.heroes.length).toBe(0)
    })
    it("expect heroes to be set successfully when ngOninit()", fakeAsync(() => {
        component.ngOnInit()
        flush()
        expect(component.heroes.length).withContext("length").toBe(2)
        expect(component.heroes[0].name).withContext("name of hero in heroes[]").toBe(mockHeroes[0].name)
        expect(mockHeroService.getHeroes).toHaveBeenCalled()
    }))
    it("expect to delete 'super man' successfully when delete()", fakeAsync(() => {
        component.ngOnInit()
        flush()
        component.delete(mockHeroes[0])

        expect(component.heroes.length).toBe(1)
        expect(mockHeroService.deleteHero).toHaveBeenCalledOnceWith(mockHeroes[0])
    }))
})
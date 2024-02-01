import { delay, of } from "rxjs"
import { HeroesComponent } from "./heroes.component"
import { Hero } from "../hero"
import { HeroService } from "../services/hero service/hero.service"
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from "@angular/core/testing"
import { Component, Input } from "@angular/core"
import { By } from "@angular/platform-browser"
import { HeroComponent } from "../hero/hero.component"

@Component({
    selector:"app-hero",
  standalone: true,
    template:"<div></div>"
})
class HeroComponentMock{
    @Input() hero!: Hero;
}


fdescribe("heroes component (integration)", () => {
    let component: HeroesComponent,mockHeroes:Hero[],mockHeroService:jasmine.SpyObj<HeroService>,fixture:ComponentFixture<HeroesComponent>
    beforeEach(()=>{
        mockHeroes=[
            {id:100,name: "super man",strength:17},
            {id:103,name: "bat man",strength:6},
            {id:102,name: "bat man2",strength:6},
        ]
         mockHeroService= jasmine.createSpyObj(["getHeroes","deleteHero"])
        mockHeroService.getHeroes.and.returnValue( of(mockHeroes) )
        
         TestBed.configureTestingModule({
            imports:[HeroesComponent],
            providers:[
                {provide:HeroService,useValue:mockHeroService}
            ]
          })//.overrideComponent(HeroesComponent,{
        //     remove:{imports:[HeroComponent]},
        //     add:{imports:[HeroComponentMock]},
        //  })//
       fixture= TestBed.createComponent(HeroesComponent)
       component= fixture.componentInstance
    //    fixture.detectChanges()
    })
    it("expect heroes[] to be empty",()=>{
        expect(component.heroes.length).toBe(0)
    })
    it("expect heroes to be set successfully when ngOninit() and template detect changes",()=>{
        
        component.ngOnInit()
        expect(component.heroes.length).withContext("length").toBe(3)
        expect(component.heroes[0].name).withContext("name of hero in heroes[]").toBe(mockHeroes[0].name)
        expect(mockHeroService.getHeroes).toHaveBeenCalled()

        fixture.detectChanges()
        let liTags= fixture.debugElement.queryAll(By.css("app-hero"))
        expect(liTags.length).toBe(3)

       let childrenComponents= fixture.debugElement.queryAll(By.directive(HeroComponent))
       expect(childrenComponents.length).toBe(3)
       expect(childrenComponents[0].componentInstance.hero.name).toBe(mockHeroes[0].name)
    })
    it("expect to delete 'super man' successfully when delete()",()=>{
        component.ngOnInit()

        component.delete(mockHeroes[0])

        expect(component.heroes.length).toBe(2)
        expect(mockHeroService.deleteHero).toHaveBeenCalledOnceWith(mockHeroes[0])
    })
    
})
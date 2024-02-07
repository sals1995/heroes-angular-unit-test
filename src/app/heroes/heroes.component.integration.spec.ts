

import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../services/hero service/hero.service";
import { Hero } from "../hero";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

@Component({
    selector: 'app-hero',
    standalone: true,
    template:"<div></div>"
})
class HeroComponentMock {
    @Input() hero!: Hero;
}

describe("heroes component (integration)", () => {
    let component: HeroesComponent, mockHeroService: jasmine.SpyObj<HeroService>, mockHeroes: Hero[], fixture: ComponentFixture<HeroesComponent>
    beforeEach(() => {
        mockHeroes = [
            { id: 100, name: "superman", strength: 10 },
            { id: 101, name: "batman", strength: 20 },
        ]
        mockHeroService = jasmine.createSpyObj(["getHeroes", "addHero", "deleteHero"])
        mockHeroService.getHeroes.and.returnValue(of(mockHeroes))
        TestBed.configureTestingModule({
            imports: [HeroesComponent]
        }).overrideComponent(HeroesComponent, {
            set: {
                // imports:[HeroComponentMock],
                providers: [{ provide: HeroService, useValue: mockHeroService }]
            }
        })

        fixture = TestBed.createComponent(HeroesComponent)
        component = fixture.componentInstance
    })
    it('expect heroes [] to be empty', () => {
        expect(component.heroes).toHaveSize(0)
    });
    it("expect after calling ngOnInit heroes not empty then template detected", () => {
        component.ngOnInit()
        expect(mockHeroService.getHeroes).toHaveBeenCalled()
        expect(component.heroes).toEqual(mockHeroes)
        //access li tags
        fixture.detectChanges()
       let liTags= fixture.debugElement.queryAll(By.css("li"))

        //check template binding
        expect(liTags.length).toBe(2)
    })
    it("expect after calling ngOnInit heroes not empty then template detected in children", () => {
        component.ngOnInit()
        fixture.detectChanges()
        let children= fixture.debugElement.queryAll(By.directive(HeroComponent))
        expect(children.length).toBe(mockHeroes.length)
        expect(children[0].componentInstance.hero).toEqual(mockHeroes[0])
    })
})
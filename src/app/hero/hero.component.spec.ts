import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { By } from '@angular/platform-browser';
describe("hero component:", () => {
    let fixture: ComponentFixture<HeroComponent>,component:HeroComponent
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HeroComponent]
        })
     fixture =  TestBed.createComponent(HeroComponent)
    component=fixture .componentInstance
        
    })
    it('expect after setting hero to bind it in template', () => {
        component.hero={id:1,name:"superman",strength:10}
        fixture.detectChanges()
        //access template
        //1
        let span=fixture.debugElement.query(By.css(".badge"))
        //2
        let div= fixture.nativeElement.querySelector("div")

        //check template binding
        expect(span.nativeElement.textContent).toBe("1");
        expect(div.textContent).toContain("superman")
    });
})
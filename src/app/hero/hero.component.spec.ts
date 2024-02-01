import {ComponentFixture, TestBed} from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { By } from "@angular/platform-browser"
fdescribe("hero component:", () => {
    let fixture: ComponentFixture<HeroComponent>,component: HeroComponent
    beforeEach(/* async */()=>{
     /*  await  */ TestBed.configureTestingModule({
            imports:[HeroComponent]
        })/* .compileComponents() */

        fixture= TestBed.createComponent(HeroComponent)
       component= fixture.componentInstance
    })
    it("expect component to be created ",()=>{
       expect(component).toBeTruthy()
    })
    it("expect after setting hero{}, template detect changes",()=>{
        component.hero={id:1, name:"bat man",strength:20}//mocking @input
        fixture.detectChanges()

        //1
       let span= fixture.debugElement.query( By.css(".badge") )
       //2
       let div= fixture.nativeElement.querySelector("div")

       expect(span.nativeElement.textContent).toBe("1")
       expect(div.textContent).toContain("bat man")
    })//
})
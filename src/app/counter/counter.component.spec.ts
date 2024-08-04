import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CounterComponent } from "./counter.component";
import { By } from "@angular/platform-browser";

describe('counter component: ', () => {
  let fixture: ComponentFixture<CounterComponent>,component:CounterComponent
    beforeEach(()=>{
      TestBed.configureTestingModule({
        imports:[CounterComponent]
      })

     fixture= TestBed.createComponent(CounterComponent)
     component= fixture.componentInstance
    })
  it('should create component', () => {
    expect(component).toBeDefined();
  });
  it("p tag should have counter",()=>{
    fixture.detectChanges()
    //1
    let p=fixture.nativeElement.querySelector("p")

    expect(p.textContent).toContain("0")
  })
  it("after clicking + button should increase counter then detect it in template",()=>{
    //access button
   let button= fixture.debugElement.query( By.css("#inc") )
    // click
    button.triggerEventHandler("click")
    button.triggerEventHandler("click")
    button.triggerEventHandler("click")
    fixture.detectChanges()
    // access p
    let p=fixture.nativeElement.querySelector("p")

    expect(p.textContent).toContain("3")

  })
  it("after clicking - button should decrease counter then detect it in template",()=>{
    // access button
   let button= fixture.debugElement.query(By.css("#dec"))
    // click
    button.triggerEventHandler("click")
    button.triggerEventHandler("click")
    // counter
    expect(component.counter).toBe(-2)
    // access p
    fixture.detectChanges()
    // access p
    let p=fixture.nativeElement.querySelector("p")

    expect(p.textContent).toContain("-2")

  })
});

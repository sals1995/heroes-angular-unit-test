import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CounterComponent } from "./counter.component";
import { By } from "@angular/platform-browser";

fdescribe('counter component: ', () => {
  let fixture:ComponentFixture<CounterComponent>,component:CounterComponent
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[CounterComponent]
    })
   fixture= TestBed.createComponent(CounterComponent)
   component= fixture.componentInstance
  })

  it("expect component to be created", () => {
    expect(component).toBeDefined()
  })
  it("expect counter=0 in template",()=>{
    fixture.detectChanges()
   let p= fixture.debugElement.query(  By.css("p") )

   expect(p.nativeElement.textContent).toContain("0")
  })

  it("expect counter=1 when pressing inc btn and template detect changes",()=>{
    //click
    let btn= fixture.debugElement.query(By.css("#inc") )
    btn.triggerEventHandler("click")
    //counter=> ts
    expect(component.counter).toBe(1)
    //template after click
    fixture.detectChanges()
    let p= fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain("1")
  })

  it("expect counter=-3 when pressing dec btn and template detect changes",()=>{
    let btn= fixture.debugElement.query( By.css("#dec"))
    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")

    expect(component.counter).toBe(-3)

    fixture.detectChanges()
    let p= fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain("-3")
  })
});

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
    fixture.detectChanges()
  })
  it('expect component to be created', () => {
    expect(component).toBeTruthy();
  });
  it("expect p in template to have 0",()=>{
    //access p
    let p=fixture.nativeElement.querySelector("p")
    //check content
    expect(p.textContent).toContain("0")
  })
  it("expect after clicking inc btn to change counter in template",()=>{

    //access btn
    let btn=fixture.debugElement.query(By.css("#inc"))
    //click
    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")
    //check counter in ts
    expect(component.counter).toBe(3)
    //check counter in template
    fixture.detectChanges()
      //access p
      let p=fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain("3")
  })
  it("expect after clicking dec btn to change counter in template",()=>{
    let btn=fixture.debugElement.query(By.css("#dec"))

    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")

    expect(component.counter).toBe(-2)
    fixture.detectChanges()
    let p=fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain("-2")
  })
});

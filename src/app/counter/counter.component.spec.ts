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
  it('expect template to have counter=0', () => {
    fixture.detectChanges()
    let p= fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain("0")
  });
  it('expect after clicking inc button template to have counter=1', () => {
    //access button
   let btn= fixture.debugElement.query(By.css("#inc"))
    //fire click
    btn.triggerEventHandler("click")
    //check template binding
    expect(component.counter).toBe(1)
    fixture.detectChanges()
    var p= fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain("1")
    btn.triggerEventHandler("click")
    fixture.detectChanges()
    var p= fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain("2")
  });
});

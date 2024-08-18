import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CounterComponent } from "./counter.component";
import { By } from "@angular/platform-browser";

fdescribe('counter component: ', () => {
  let component:CounterComponent,fixture: ComponentFixture<CounterComponent>
  beforeEach(()=>{
    // 1
    TestBed.configureTestingModule({
      imports:[CounterComponent]
    })/* .compileComponents() */
    // 2
    fixture= TestBed.createComponent(CounterComponent)
    // 3
   component=fixture.componentInstance
   
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("expect counter=0 to be reflected in template",()=>{
    fixture.detectChanges()
    // 1- access tag in template
    // let p=fixture.debugElement.query( By.css("p") )
    // expect(p.nativeElement.textContent).toBe("0")
    // 2- access tag in template
    let p= fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain("0")

    component.counter=12
    fixture.detectChanges()
    expect(p.textContent).toContain("12")
  })
  it("expect after clicking btn +, should counter+ then detect that in template",()=>{
    // access btn from template
   let btn= fixture.debugElement.query(By.css("#inc"))
    // click btn
    btn .triggerEventHandler("click")
    btn .triggerEventHandler("click")
    btn .triggerEventHandler("click")

    // counter+
    expect(component.counter).toBe(3)
    // template
    fixture.detectChanges()
    let p=fixture.debugElement.query( By.css("p") )
    expect(p.nativeElement.textContent).toContain("3")
  })
});

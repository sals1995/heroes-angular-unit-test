import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { By } from '@angular/platform-browser';
import { appConfig } from '../app.config';
describe("hero component:", () => {
  let component: HeroComponent, fixture: ComponentFixture<HeroComponent>
  beforeEach(/* async */ () => {
    /* await */ TestBed.configureTestingModule(Object.assign({}, appConfig, {
      imports: [HeroComponent]
    }))/* .compileComponents() */

    fixture = TestBed.createComponent(HeroComponent)
    component = fixture.componentInstance

  })
  it('expect component to be created', () => {
    expect(component).toBeTruthy();
  });
  it('expect after setting hero to detect that in template', () => {
    component.hero={id:1,name:"superman",strength:10}//hero mock
    fixture.detectChanges()
    //access template
      //1
   let span= fixture.debugElement.query( By.css(".badge") )
      //2
   let div= fixture.nativeElement.querySelector("div")

    //check content
    expect(span.nativeElement.textContent).toBe("1")
    expect(div.textContent).toContain("superman")
  });
})
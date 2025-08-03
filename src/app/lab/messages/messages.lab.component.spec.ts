import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MessagesComponentForLab } from "./messages.lab.component";

describe("2-message component integration testing:", () => {
  let fixture: ComponentFixture<MessagesComponentForLab>;
  let component: MessagesComponentForLab;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesComponentForLab],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesComponentForLab);
    component = fixture.componentInstance;
  });

  it("expect component template to be empty", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div.msg')).toBeNull();
  });

  it("then expect div.msg to have the messages after setting it", () => {
    component.addMessage("Test message");
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const messageDivs = compiled.querySelectorAll('div.msg');
    expect(messageDivs.length).toBe(1);
    expect(messageDivs[0].textContent).toContain("Test message");
  });
});

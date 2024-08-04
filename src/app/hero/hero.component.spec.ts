import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { By } from '@angular/platform-browser';

describe('hero component:', () => {
  let fixture: ComponentFixture<HeroComponent>, component: HeroComponent;
  beforeEach(() => {
    //1
    TestBed.configureTestingModule({
      imports: [HeroComponent],
    });
    //2
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set hero correctly then template should detect', () => {
    component.hero = { id: 100, name: 'super man', strength: 20 };
    //
    fixture.detectChanges();
    //access template
    // 1
    let span = fixture.debugElement.query(By.css('span'));
    //  2
    let div = fixture.nativeElement.querySelector('div');
    expect(span.nativeElement.textContent).toBe('100');
    expect(div.textContent).toContain('super man');
  });
});

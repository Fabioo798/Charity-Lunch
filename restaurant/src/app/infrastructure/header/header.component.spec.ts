import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the HeaderComponent with initialized btns', () => {
    expect(component).toBeTruthy();
    expect(component.btns).toEqual([
      { path: '/order', label: 'Order now' },
      { path: '/recipes', label: 'Our Plates' },
      { path: '/history', label: 'History' },
      { path: '/storage', label: 'Store' },
    ]);
  });
});

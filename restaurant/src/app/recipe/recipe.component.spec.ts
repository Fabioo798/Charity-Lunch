import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeComponent } from './recipe.component';
import { recipes } from './recipes';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
  });

  it('should create the RecipeComponent with initialized recipes', () => {
    expect(component).toBeTruthy();
    expect(component.recipes).toEqual(recipes);
  });
});

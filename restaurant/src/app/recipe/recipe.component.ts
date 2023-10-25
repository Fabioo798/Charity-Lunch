import { Component } from '@angular/core';
import { Dish } from 'src/interfaces/interfaces';
import { dishes } from './recipes';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  dishes: Dish[];

  constructor() {
    this.dishes = dishes;
  }
}

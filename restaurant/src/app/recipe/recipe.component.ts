import { Component } from '@angular/core';
import { Dish } from 'src/interfaces/interfaces';
import { recipes } from './recipes';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  recipes: Dish[];

  constructor() {
    this.recipes = recipes;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../services/action.service';
import { Action } from '../../models/action.model';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {
  actions: Action[] = [];
  
  constructor(private actionService: ActionService) {}

  ngOnInit(): void {
    this.loadActions();
  }

  loadActions(): void {
    this.actionService.getActions().subscribe(
      (data) => {
        this.actions = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des actions:', error);
      }
    );
  }

  updateTauxRealisation(action: Action, nbLivrablesRealises: number): void {
    this.actionService.updateTauxRealisation(action.id!, nbLivrablesRealises).subscribe(
      (updatedAction) => {
        const index = this.actions.findIndex(a => a.id === updatedAction.id);
        if (index !== -1) {
          this.actions[index] = updatedAction;
        }
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du taux de réalisation:', error);
      }
    );
  }
}

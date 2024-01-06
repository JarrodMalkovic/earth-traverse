import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  template: `
    <div
      class="z-50 absolute mt-2 w-48 backdrop-blur-lg bg-white/20 bg-opacity-10 rounded-md shadow-lg border-2 border-white/10"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class DropdownComponent {
  @Output() closeDropdown = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeDropdown.emit();
  }
}

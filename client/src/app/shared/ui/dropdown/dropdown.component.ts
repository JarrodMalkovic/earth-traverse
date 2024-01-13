import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  template: `
    <div
      *ngIf="isOpen"
      class="z-50 absolute mt-2 w-48 bg-[#7488a96c] bg-opacity-50 backdrop-blur-lg rounded-md shadow-lg border-2 border-white/10"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class DropdownComponent {
  @Output() closeDropdown = new EventEmitter<void>();

  @Input() isOpen: boolean = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    this.closeDropdown.emit();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen) {
        this.closeDropdown.emit();
      }
    }
  }
}

import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appAvatarFallback]',
  standalone: true
})
export class AvatarFallbackDirective {
  @Input() avatarUrl: string = '';
  @Input() avatarName: string = '';

  @HostListener('error', ['$event'])
  onError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = `https://ui-avatars.com/api/?background=323246&color=fff&name=${encodeURIComponent(this.avatarName)}`;
  }
}

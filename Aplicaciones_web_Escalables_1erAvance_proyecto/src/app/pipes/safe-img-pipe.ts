import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeImg',
  standalone: true
})
export class SafeImgPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string | undefined): SafeUrl {
    console.log('Valor recibido en el pipe:', value);
    if (!value) return '/profile.jpg'; 
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
